const express=require("express")
const router =express.Router();
const {getUser,findStudentbyId,findTeacherbyId}=require("../controllers/user");
const { isSignedIn, isAuthenticated, isTeacher } = require("../controllers/auth");
router.param("student_id",findStudentbyId);
router.param("teacher_id",findTeacherbyId);
router.get("/student/:student_id",isSignedIn,isAuthenticated,getUser);
router.get("/teacher/:teacher_id",isSignedIn,isAuthenticated,isTeacher,getUser);




module.exports=router;