const Student = require("../models/student");
const Teacher = require("../models/teacher");
const StudentTimeTable = require("../models/student_timetable");
const TeacherTimetable = require("../models/teacher_timetable");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
exports.studentSignup = async (req, res) => {
	const student = new Student(req.body);
	student.save((err, student) => {
		if (err || !student) {
			return res.status(400).json({
				error: "student cannot be created",
			});
		}
		return res.json({
			email: student.email,
		});
	});
};
exports.teacherSignup = async (req, res) => {
	const teacher = new Teacher(req.body);
	teacher.save((err, teacher) => {
		if (err || !teacher) {
			return res.status(400).json({
				error: "teacher cannot be created",
			});
		}
		return res.json({
			email: teacher.email,
		});
	});
};
exports.student_timetableInput = async (req, res) => {
	const studenttimetable = new StudentTimeTable(req.body);
	studenttimetable.save((err, timetable) => {
		if (err || !timetable) {
			return res.status(400).json({
				error: "student timetable cant be created",
			});
		}
		return res.json(timetable);
	});
};

exports.teacher_timetableInput = async (req, res) => {
	const teachertimetable = new TeacherTimetable(req.body);
	teachertimetable.save((err, timetable) => {
		if (err || !timetable) {
			return res.status(400).json({
				error: "student timetable cant be created",
			});
		}
		return res.json(timetable);
	});
};

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
exports.find = async (req, res) => {
	Student.find().exec((err, students) => {
		if (err || !students) {
			return res.status(400).json({
				error: "students not there",
			});
		}
		return res.json(students);
	});
};
exports.isTeacher = async (req, res, next) => {
	if (req.profile.role === 0) {
		return res.status(403).json({
			error: "Access denied,You are not a teacher",
		});
	}
	next();
};
exports.isSignedIn = expressJwt({
	secret: "Success",
	userProperty: "auth",
});
exports.isAuthenticated = async (req, res, next) => {
	var a = req.profile && req.auth && req.profile._id == req.auth._id;
	if (!a) {
		return res.status(403).json({
			error: "Access denied",
		});
	}
	next();
};
exports.signout = async (req, res) => {
	res.clearCookie("token");
	return res.json("User logout Succesful");
};

exports.signin = async (req, res) => {
	let { email, password } = req.body;
	Student.findOne({ email }, (err, student) => {
		if (err || !student) {
			let { email, password } = req.body;
			return Teacher.findOne({ email }, (err, teacher) => {
				if (err || !teacher) {
					return res.status(400).json({
						error: "User not found",
					});
				}
				if (!teacher.autheticate(password)) {
					return res.status(400).json({
						error: "Wrong password",
					});
				}
				const token = jwt.sign({ _id: teacher._id }, "Success");
				var now = new Date();
				var time = now.getTime();
				var expireTime = time + 1000 * 36000;
				now.setTime(expireTime);
				res.cookie("token", token, { maxAge: 600000 });
				return TeacherTimetable.findOne({ name: teacher.name }, (err, tt) => {
					//console.log(teacher.name);
					if (err || !tt) {
						return res.status(400).json({
							error: "no timetable found in the database",
						});
					}
					teacher.timetable = tt;
					//console.log(tt)
					teacher.save();
					const { _id, name, email, role } = teacher;
					return res.json({ token, user: { _id, name, email, role } });
				});
			});
		}
		if (!student.autheticate(password)) {
			return res.status(400).json({
				error: "Wrong password",
			});
		}
		const token = jwt.sign({ _id: student._id }, "Success");
		res.cookie("token", token, { expire: new Date() + 9999 });
		return StudentTimeTable.findOne(
			{ sec: student.sec, batch: student.batch },
			(err, tt) => {
				if (err || !tt) {
					return res.status(400).json({
						error:
							"no timetable found in the database for your section,try later ",
					});
				}
				student.timetable = tt;
				//console.log(tt)
				student.save();
				const { _id, name, email, role } = student;
				return res.json({ token, user: { _id, name, email, role } });
			}
		);
	});
};

exports.get_sectionTimeTable = async (req, res) => {
	StudentTimeTable.findOne(
		{ sec: req.body.sec, batch: req.body.batch },
		(err, tt) => {
			if (err || !tt) {
				return res.status(400).json({
					error: "TimeTable not found",
				});
			}
			return res.json(tt);
		}
	);
};

exports.get_teacherTimeTable = async (req, res) => {
	TeacherTimetable.findOne({ name: req.body.name }, (err, tt) => {
		if (err || !tt) {
			return res.status(400).json({
				error: "TimeTable not found",
			});
		}
		//console.log(tt.timetable);
		return res.json(tt);
	});
};
