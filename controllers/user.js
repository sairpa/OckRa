const Student=require("../models/student");
const Teacher=require("../models/teacher");
const StudentTimetable=require("../models/student_timetable");
const TeacherTimetable=require("../models/teacher_timetable");

exports.findStudentbyId =(req,res,next,id)=>{
    Student.findById(id).exec((err,student)=>{
        if(err || !student){
            return res.status(400).json({
                error: "No user was found in DB"
            });
        }
        req.profile=student;
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
        next();

    })
}
exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json({"Name":req.profile.name,"email":req.profile.email});
};