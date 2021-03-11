const express=require("express");
const router=express.Router();
const {studentSignup,find,signin,signout,teacherSignup}=require("../controllers/auth");
router.post("/student/signup",studentSignup);
router.post("/teacher/signup",teacherSignup);
router.get("/find",find);
router.post("/signin",signin);
router.get("/signout",signout);
module.exports=router;