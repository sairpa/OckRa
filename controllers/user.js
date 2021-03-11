const crypto = require('crypto');
const Student=require("../models/student");
const Teacher=require("../models/teacher");
const StudentTimetable=require("../models/student_timetable");
const TeacherTimetable=require("../models/teacher_timetable");
const Feedback =require("../models/feedback")
const Token= require("../models/token")
const nodemailer = require("nodemailer");
const teacher = require('../models/teacher');
exports.findStudentbyId =(req,res,next,id)=>{
    Student.findById(id).exec((err,student)=>{
        if(err || !student){
            return res.status(400).json({
                error: "No user was found in DB"
            });
        }
        req.profile=student;
        req.profile.salt = undefined;
        req.profile.encry_password = undefined;
        next();

    })
}

exports.findTeacherbyId =(req,res,next,id)=>{
    Teacher.findById(id).exec((err,teacher)=>{
        if(err || !teacher){
            return res.status(400).json({
                error: "No user was found in DB"
            });
        }
        req.profile=teacher;
        req.profile.salt = undefined;
        req.profile.encry_password = undefined;
        next();

    })
}
exports.getUser = (req, res) => {
    
    if(req.profile.role==1){
        return res.json({"Teacher Name":req.profile.name,"email":req.profile.email});
    }
    return res.json({"Student Name":req.profile.name,"email":req.profile.email});
};

exports.enter_feedback =(req,res)=>{
    let {email}=req.profile
    let {user_feedback}=req.body
    //console.log(req.profile.email)
    const feedback_obj =new Feedback({email,user_feedback})
    Feedback.findOne({email},(err,db_feedback)=>{
        if(err || !db_feedback ){
            return feedback_obj.save((errr,saved_feedback)=>{
                if(errr || !saved_feedback){
                    return res.status(400).json({
                        "error":"feedback cannot be saved"
                    })
                }
                return res.json({
                    "email":saved_feedback.email,
                    
                    "feedback":saved_feedback.user_feedback
                })

            })
        }
        const feedback_array=[]
        feedback_array.push(req.body.user_feedback)
        //console.log(feedback_array)
        Feedback.findOneAndUpdate(
            {email:req.profile.email},
            { $push: { user_feedback: feedback_array } },
            { new: true },
            (err,updated_feedback)=>{
                if(err || !updated_feedback ){
                    return res.status(400).json({
                        "msg":"Cannot make the changes"
                    })
                }
                //console.log(typeof(updated_feedback.user_feedback))
                return res.json({
                    "feedback":updated_feedback.user_feedback
                })
            }
        )
        //return res.json("user already there")
    })

}

exports.checkuser =(req,res,next)=>{
    let {email}= req.body
    //console.log(email)
    if(!email){
        email=req.params.email
        req.body.email=req.params.email
        //console.log(email)
    }
    var a=0
    Student.findOne({email},(err,student)=>{
        if(err || !student){
            //console.log("Not a student")
            return Teacher.findOne({email},(err,teacher)=>{
                if(err || !teacher){
                    //console.log(req.headers.host)
                    return res.json("invalid emailID")
                    
                }
                else{
                    let checkTeacher=true
                    let {email} =teacher
                    req.cond={checkTeacher,email}
                    next();
                }
            })
        }
        else{
            let checkTeacher=false
            let {email} =student
            req.cond={checkTeacher,email}
            next();
        }
    })
    //console.log(a)
    /*if(a==1){
        return res.json("invalid email")
    }
    next();*/

}

exports.forgot_password=(req,res)=>{
    let {email}= req.body
    Token.findOne({email},(err,token)=>{
        if(err || !token ){
            const token_obj= Token({email:req.body.email,token:crypto.randomBytes(16).toString('hex')})
            //console.log("email not found")
            return token_obj.save((errr,to)=>{
                if(errr || !to){
                    return res.status(400).json({
                        "error":"token cannot be created"
                    })
                }
                var transporter = nodemailer.createTransport({ host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: { user: 'ockra13@gmail.com', pass:"swprojectpass" }
                });
                var mailOptions = { from: 'ockra13@gmail.com', to: req.body.email, subject: 'Password change Link', text: 'Hello ' +',\n\n' + 'Please cahnge your password by clicking the link: \nhttp:\/\/' + req.headers.host + '\/reset\/' + req.body.email + '\/' + token_obj.token + '\n\nThank You!\n' };
                transporter.sendMail(mailOptions,(err)=>{
                    if (err) {
                        console.log(err) 
                        return res.status(500).send({msg:'Technical Issue!, Please click on resend for verify your Email.'});
                    }
                    return res.json("A mail is sent to your account")

                })
                
            })
        }
        
        return res.json("Email is already sent")
    })

}

exports.reset_password=(req,res)=>{
    let {email}=req.cond
    //If teacher
    if(req.cond.checkTeacher){
        Teacher.findOne({email},(err,teacher)=>{
            
            teacher.updatepassword(req.body.password)
            return teacher.save((err)=>{
                if(err){
                    return res.status(400).json({
                        error:"updation didn't happen"
                    })
                }
                return res.json("password updated")

            })
            
        })
    }
    //Student
    else{
        Student.findOne({email},(err,student)=>{
           
            student.updatepassword(req.body.password)
            return student.save(err=>{
                if(err){
                    return res.status(400).json({
                        error:"updation didn't happen"
                    })
                }
                return res.json("password updated")

            })
            
        })
        
    }

}

exports.check_Token= (req,res,next,id)=>{
    //console.log(req.params.email,id)
    Token.findOne({email:req.params.email,token:id},(err,token)=>{
        if(err || !token){
            return res.status(400).json("Invalid link")
        }
        next();
    })
}