const Student =require("../models/student");
const Teacher=require("../models/teacher")
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
exports.studentSignup =(req,res)=>{
    const student =new Student(req.body);
    student.save((err,student)=>{
        if(err || !student){
            return res.status(400).json({
                error:"student can be created"
            });
        }
        return res.json({
            "email":student.email
        });
    });

}
exports.teacherSignup=(req,res)=>{
    const teacher =new Teacher(req.body);
    teacher.save((err,teacher)=>{
        if(err || !teacher){
            return res.status(400).json({
                error:"teacher cannot be created"
            });
        }
        return res.json({
            "email":teacher.email
        });
    });

}

/*exports.signin=(req,res)=>{
    const {email,password}=req.body;
    Student.findOne({email},(err,student)=>{
        if(err || !student){
            return res.status(400).json({
                error:"Wrong username"
            });
        }
        if(!student.autheticate(password)){
            return res.status(400).json({
                error:"Wrong password"
            });
        }
        const token = jwt.sign({ _id: student._id }, "Success");
        res.cookie("token", token, { expire: new Date() + 9999 });
        const { _id, name, email, role } = student;
        return res.json({ token, user: { _id, name, email, role } });
    });
    

}*/
exports.find=(req,res)=>{
    Student.find().exec((err,students)=>{
        if(err || !students){
            return res.status(400).json({
                error:"students not there"
            });
        }
        return res.json(students);
    })
}
exports.isTeacher=(req,res,next)=>{
    if(req.profile.role===0){
        return res.status(403).json({
            error:"Access denied,You are not a teacher"
        });
    }
    next()
}
exports.isSignedIn = expressJwt({
    secret: "Success",
    userProperty: "auth"
  });
exports.isAuthenticated=(req,res,next)=>{
    var a=req.profile && req.auth && req.profile._id==req.auth._id;
    if(!a){
        return res.status(403).json({
            error:"Access denied"
        })

    }
    next();
}
exports.signout=(req,res)=>{
    res.clearCookie("token");
    return res.json("User logout Succesful")
}

exports.signin=(req,res)=>{
    let {email,password}=req.body;
    Student.findOne({email},(err,student)=>{
        if(err || !student){
            let {email,password}=req.body;
            return Teacher.findOne({email},(err,teacher)=>{
                if(err || !teacher){
                    return res.status(400).json({
                        error:"User not found"
                    })
                }
                if(!teacher.autheticate(password)){
                    return res.status(400).json({
                        error:"Wrong password"
                    });
                }
                const token = jwt.sign({ _id: teacher._id }, "Success");
                res.cookie("token", token, { expire: new Date() + 9999 });
                const { _id, name, email, role } = teacher;
                return res.json({ token, user: { _id, name, email, role } });

            })
        }
        if(!student.autheticate(password)){
            return res.status(400).json({
                error:"Wrong password"
            });
        }
        const token = jwt.sign({ _id: student._id }, "Success");
        res.cookie("token", token, { expire: new Date() + 9999 });
        const { _id, name, email, role } = student;
        return res.json({ token, user: { _id, name, email, role } });

    })
}