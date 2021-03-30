const express=require("express");
const router=express.Router();
const {studentSignup,find,signin,signout,teacherSignup,student_timetableInput,teacher_timetableInput,get_sectionTimeTable,get_teacherTimeTable}=require("../controllers/auth");
router.post("/student/signup",studentSignup);
router.post("/teacher/signup",teacherSignup);
router.get("/find",find);
router.post("/signin",signin);
router.get("/signout",signout);
router.post("/inputStudentTimetable",student_timetableInput)
router.post("/inputTeacherTimetable",teacher_timetableInput)
router.post("/search/sectiontimetable",get_sectionTimeTable)
router.post("/search/teachertimetable",get_teacherTimeTable)
module.exports=router;