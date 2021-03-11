const express=require("express")
const router =express.Router();
const {getUser,findStudentbyId,findTeacherbyId,enter_feedback,forgot_password,checkuser,reset_password,check_Token}=require("../controllers/user");
const { isSignedIn, isAuthenticated, isTeacher } = require("../controllers/auth");
router.param("student_id",findStudentbyId);
router.param("teacher_id",findTeacherbyId);
router.param("token_id",check_Token)
router.get("/student/:student_id",isSignedIn,isAuthenticated,getUser);
router.get("/teacher/:teacher_id",isSignedIn,isAuthenticated,isTeacher,getUser);
router.post("/teacher/:teacher_id/feedback",isSignedIn,isAuthenticated,isTeacher,enter_feedback)
router.post("/student/:student_id/feedback",isSignedIn,isAuthenticated,enter_feedback)
router.post("/forgotpassword",checkuser,forgot_password)
router.post("/reset/:email/:token_id",checkuser,reset_password)





module.exports=router;