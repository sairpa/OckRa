const crypto = require("crypto");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const StudentTimeTable = require("../models/student_timetable");
const TeacherTimetable = require("../models/teacher_timetable");
const Feedback = require("../models/feedback");
const Token = require("../models/token");
const nodemailer = require("nodemailer");
const teacher = require("../models/teacher");
const Request = require("../models/request");
const { json } = require("body-parser");

exports.findStudentbyId = async (req, res, next, id) => {
	Student.findById(id).exec((err, student) => {
		if (err || !student) {
			return res.status(400).json({
				error: "Access denied Not a student",
			});
		}
		req.profile = student;
		req.profile.salt = undefined;
		req.profile.encry_password = undefined;

		next();
	});
};

exports.findTeacherbyId = async (req, res, next, id) => {
	Teacher.findById(id).exec((err, teacher) => {
		if (err || !teacher) {
			return res.status(400).json({
				error: "Access Denied Not a teacher",
			});
		}
		req.profile = teacher;
		req.profile.salt = undefined;
		req.profile.encry_password = undefined;
		next();
	});
};
exports.getUser = async (req, res) => {
	if (req.profile.role == 1) {
		return TeacherTimetable.findOne({ name: req.profile.name }, (err, tt) => {
			if (err || !tt) {
				return res.status(400).json({
					error: "no timetable found in the database",
				});
			}
			req.profile.timetable = tt;
			//console.log(tt)
			//student.save();
			return res.json(req.profile);
		});
	}
	return StudentTimeTable.findOne(
		{ sec: req.profile.sec, batch: req.profile.batch },
		(err, tt) => {
			if (err || !tt) {
				return res.status(400).json({
					error: "no timetable found the database for your section",
				});
			}
			req.profile.timetable = tt;
			//console.log();
			//student.save();
			return res.json(req.profile);
		}
	);
};

exports.enter_feedback = async (req, res) => {
	let { email } = req.profile;
	if (!email) {
		email = req.body.email;
	}
	let { user_feedback } = req.body;
	//console.log(req.profile.email)
	const feedback_obj = new Feedback({ email, user_feedback });
	Feedback.findOne({ email }, (err, db_feedback) => {
		if (err || !db_feedback) {
			return feedback_obj.save((errr, saved_feedback) => {
				if (errr || !saved_feedback) {
					return res.status(400).json({
						error: "feedback cannot be saved",
					});
				}
				return res.json({
					email: saved_feedback.email,

					feedback: saved_feedback.user_feedback,
				});
			});
		}
		const feedback_array = [];
		feedback_array.push(req.body.user_feedback);
		//console.log(feedback_array)
		Feedback.findOneAndUpdate(
			{ email: req.profile.email },
			{ $push: { user_feedback: feedback_array } },
			{ new: true },
			(err, updated_feedback) => {
				if (err || !updated_feedback) {
					return res.status(400).json({
						error: "Cannot make the changes",
					});
				}
				//console.log(typeof(updated_feedback.user_feedback))
				return res.json({
					feedback: updated_feedback.user_feedback,
				});
			}
		);
		//return res.json("user already there")
	});
};

exports.checkuser = async (req, res, next) => {
	let { email } = req.body;
	//console.log(email)
	if (!email) {
		email = req.params.email;
		req.body.email = req.params.email;
		//console.log(email)
	}
	var a = 0;
	Student.findOne({ email }, (err, student) => {
		if (err || !student) {
			//console.log("Not a student")
			return Teacher.findOne({ email }, (err, teacher) => {
				if (err || !teacher) {
					//console.log(req.headers.host)
					return res.status(400).json({ error: "invalid emailID" });
				} else {
					let checkTeacher = true;
					let { email } = teacher;
					req.cond = { checkTeacher, email };
					next();
				}
			});
		} else {
			let checkTeacher = false;
			let { email } = student;
			req.cond = { checkTeacher, email };
			next();
		}
	});
	//console.log(a)
	/*if(a==1){
        return res.json("invalid email")
    }
    next();*/
};

exports.forgot_password = async (req, res) => {
	let { email } = req.body;
	Token.findOne({ email }, (err, token) => {
		if (err || !token) {
			const token_obj = Token({
				email: req.body.email,
				token: crypto.randomBytes(16).toString("hex"),
			});
			//console.log("email not found")
			return token_obj.save((errr, to) => {
				if (errr || !to) {
					return res.status(400).json({
						error: "token cannot be created",
					});
				}
				var transporter = nodemailer.createTransport({
					host: "smtp.gmail.com",
					port: 587,
					secure: false,
					requireTLS: true,
					auth: { user: "ockra13@gmail.com", pass: "swprojectpass" },
				});
				var mailOptions = {
					from: "ockra13@gmail.com",
					to: req.body.email,
					subject: "Password change Link",
					text:
						"Hello " +
						",\n\n" +
						"Please change your password by clicking the link: \nhttp://" +
						"localhost:" +
						"3000/" +
						req.body.email +
						"/" +
						token_obj.token +
						"\n\nThank You!\n",
				};
				transporter.sendMail(mailOptions, (err) => {
					if (err) {
						console.log(err);
						return res.status(500).send({
							error:
								"Technical Issue!, Please click on resend for verify your Email.",
						});
					}
					return res.json({
						msg: "A mail is sent to your account",
						token: token_obj.token,
					});
				});
			});
		}

		return res.json("Email is already sent");
	});
};

exports.reset_password = async (req, res) => {
	let { email } = req.cond;
	//If teacher
	if (req.cond.checkTeacher) {
		Teacher.findOne({ email }, (err, teacher) => {
			var a = 1;
			Token.findOneAndRemove({ email }, (err, user) => {
				if (err || !user) {
					a = 0;
				}
			});
			//console.log(a);
			if (a !== 1) {
				return res.status(400).json({
					error: "Error, Please try again ",
				});
			}
			teacher.updatepassword(req.body.password);
			return teacher.save((err) => {
				if (err) {
					return res.status(400).json({
						error: "updation didn't happen",
					});
				}
				return res.json("password updated");
			});
		});
	}
	//Student
	else {
		Student.findOne({ email }, (err, student) => {
			var a = 1;
			Token.findOneAndRemove({ email }, (err, user) => {
				if (err || !user) {
					a = 0;
				}
			});
			//console.log(a);
			if (a !== 1) {
				return res.status(400).json({
					error: "Error, Please try again ",
				});
			}

			student.updatepassword(req.body.password);
			return student.save((err) => {
				if (err) {
					return res.status(400).json({
						error: "updation didn't happen",
					});
				}
				return res.json("password updated");
			});
		});
	}
};

exports.check_Token = async (req, res, next, id) => {
	//console.log(req.params.email,id)
	Token.findOne({ email: req.params.email, token: id }, (err, token) => {
		if (err || !token) {
			return res.status(400).json({ error: "Invalid link" });
		}
		next();
	});
};

exports.update_profile = async (req, res) => {
	//console.log(req.profile.role);
	if (req.profile.role === 0) {
		let { studentinfo, mobileno, address, city, pincode } = req.body;
		let updates;
		if (studentinfo) {
			updates = {
				$push: { studentinfo: studentinfo },
				$set: {
					mobileno: mobileno,
					address: address,
					city: city,
					pincode: pincode,
				},
			};
		} else {
			updates = {
				$set: {
					mobileno: mobileno,
					address: address,
					city: city,
					pincode: pincode,
				},
			};
		}
		Student.findOneAndUpdate(
			{ email: req.profile.email },
			updates,
			{ new: true },
			(err, updated_profile) => {
				if (err || !updated_profile) {
					return res.status(400).json({
						error: "Cannot make the changes",
					});
				}
				updated_profile.salt = undefined;
				updated_profile.encry_password = undefined;
				updated_profile.updatedAt = undefined;
				updated_profile.createdAt = undefined;

				return res.json({
					profile: updated_profile,
				});
			}
		);
	} else {
		let { teacherinfo, mobileno, address, city, pincode } = req.body;
		let updates;
		if (teacherinfo) {
			updates = {
				$push: { teacherinfo: teacherinfo },
				$set: { mobileno, address, city, pincode },
			};
		} else {
			updates = { $set: { mobileno, address, city, pincode } };
		}
		Teacher.findOneAndUpdate(
			{ email: req.profile.email },
			updates,
			{ new: true },
			(err, updated_profile) => {
				if (err || !updated_profile) {
					return res.status(400).json({
						error: "Cannot make the changes",
					});
				}
				updated_profile.salt = undefined;
				updated_profile.encry_password = undefined;
				updated_profile.updatedAt = undefined;
				updated_profile.createdAt = undefined;
				return res.json({
					profile: updated_profile,
				});
			}
		);
	}
};

exports.request_update = async (req, res) => {
	//console.log("summa");
	//console.log(req.body);
	StudentTimeTable.findOne(
		{ sec: req.body.sec, batch: req.body.batch },
		(err, tt) => {
			if (err || !tt) {
				return res.status(400).json({ error: "Timetable not Found" });
			}
			const periods = [];
			const free = [];
			const t = tt.day;
			Object.keys(t).forEach((key) => {
				if (key == req.body.day) {
					for (i = 0; i < t[key].timetable.length; i++) {
						if (t[key].teacher[i] == req.body.name) {
							periods.push(i + 1);
						}
						if (t[key].timetable[i] == "Free") {
							free.push(i + 1);
						}
					}
				}
			});
			var j = {};
			j["period"] = periods;
			j["free_periods"] = free;
			if (j.period.length === 0) {
				return res.status(400).json({ error: "No periods available to shift" });
			}
			if (j.free_periods.length === 0) {
				return res.status(400).json({ error: "No free periods available" });
			}
			//console.log({ period: periods, free_periods: free });
			return res.json({ period: periods, free_periods: free });
		}
	);
};

exports.submit_request = async (req, res) => {
	tname = req.body.tname;
	day = req.body.day;
	sec = req.body.sec;
	batch = req.body.batch;
	from = req.body.from;
	to = req.body.to;
	permanent = req.body.permanent;
	//console.log(req.body.tname);
	const request = new Request({ tname, day, sec, batch, from, to, permanent });
	request.save((err) => {
		//console.log("summa");
		if (err) {
			return res.status(400).json({
				error: "Cannot make the changes",
			});
		}
		return res.json(req.body);
	});
};

exports.student_notification = async (req, res) => {
	const { sec, batch, day } = req.body;
	const a = [];
	Request.find(
		{
			sec: req.body.sec,
			batch: req.body.batch,
			day: req.body.day,
			approved: "True",
		},
		(err, requests) => {
			if (err) {
				return res.status(400).json({ error: "400 error" });
			}
			if (requests.length === 0) {
				return res
					.status(200)
					.json({ msg1: "No notifications", rejected: "NA" });
			}
			//console.log(requests);
			const n = requests.length;
			const p = [];
			var i;
			for (i = 0; i < n; i++) {
				p.push([
					requests[i].from,
					requests[i].to,
					requests[i].room,
					requests[i].tname,
				]);
			}
			//console.log(p);

			return res.status(200).json({ msg: p, rejected: "NA" });
		}
	);
};
exports.teacher_rejected_requests = async (req, res, next) => {
	var arr = [];
	Request.find(
		{
			tname: req.body.tname,

			approved: "False",
		},
		(err, requests) => {
			//console.log("inside", requests);
			if (err) {
				return res.status(400).json({ error: "400 error" });
			}
			if (requests.length === 0) {
				req.rejected = "empty";
				next();
			} else {
				var i = 0;
				var n = requests.length;
				for (i = 0; i < n; i++) {
					arr.push([
						requests[i].from,
						requests[i].to,
						requests[i].room,
						requests[i].day,
						requests[i].sec,
					]);
				}
				req.rejected = arr;
				//console.log(req.rejected, arr, n);

				next();
			}
		}
	);
};

exports.teacher_notification = async (req, res) => {
	const { name } = req.body;
	const a = [];
	Request.find(
		{
			tname: req.body.tname,
			day: req.body.day,
			approved: "True",
		},
		(err, requests) => {
			if (err) {
				return res.status(400).json({ error: "400 error" });
			}
			if (requests.length === 0) {
				return res
					.status(200)
					.json({ msg1: "No notifications", rejected: req.rejected });
			}
			//console.log(requests);
			const n = requests.length;
			const p = [];
			var i;
			for (i = 0; i < n; i++) {
				p.push([
					requests[i].from,
					requests[i].to,
					requests[i].room,
					requests[i].sec,
				]);
			}
			//console.log(p);

			return res.status(200).json({ msg: p, rejected: req.rejected });
		}
	);
};
exports.send_teacher_mail = async (req, res, next) => {
	var transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		requireTLS: true,
		auth: { user: "ockra13@gmail.com", pass: "swprojectpass" },
	});
	var mailOptions = {
		from: "ockra13@gmail.com",
		to: req.teacher_email,
		subject: "Timetable Notification",
		text:
			"Hello " +
			",\n\n" +
			"As per your request, on " +
			req.body.day +
			" period " +
			req.body.from +
			" shifted to period " +
			req.body.to +
			"\n\nThank You!\n",
	};
	transporter.sendMail(mailOptions, (err) => {
		if (err) {
			console.log(err);
			return res.status(500).send({
				error:
					"Technical Issue!, Please click on resend for verify your Email.",
			});
		}
		next();
	});
};
exports.send_notification = async (req, res) => {
	//console.log(req.teacher_email, req.studentslist);

	var transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		requireTLS: true,
		auth: { user: "ockra13@gmail.com", pass: "swprojectpass" },
	});
	var mailOptions = {
		from: "ockra13@gmail.com",
		to: req.studentslist,
		subject: "Timetable Notification",
		text:
			"Hello " +
			",\n\n" +
			req.body.day +
			" period " +
			req.body.from +
			" shifted to period " +
			req.body.to +
			"\n\nThank You!\n",
	};
	transporter.sendMail(mailOptions, (err) => {
		if (err) {
			console.log(err);
			return res.status(500).send({
				error:
					"Technical Issue!, Please click on resend for verify your Email.",
			});
		}
		return res.json("successfull");
	});

	return res.json("succesfull");
};

exports.get_students = async (req, res, next) => {
	var studentmail = [];
	console.log(req.body.sec)
	Student.find(
		{
			sec: req.body.sec,
		},
		(err, students) => {
			if (err) {
				return res.status(400).json({ error: "400 error" });
			}
			if (students.length === 0) {
				return res.status(400).json({ error: "No section found" });
			}
			n = students.length;

			var i = 0;
			for (i = 0; i < n; i++) {
				studentmail.push(students[i].email);
			}
			req.studentslist = studentmail;
			//console.log("a", studentmail);

			next();
		}
	);
};

exports.get_teacher_email = async (req, res, next) => {
	var teacheremail;
	console.log(req.body.tname)
	Teacher.findOne(
		{
			name: req.body.tname,
		},
		(err, teacher) => {
			if (err || !teacher) {
				//console.log("teacher error");
				return res.status(400).json({ error: err });
			}
			teacheremail = teacher.email;

			req.teacher_email = teacheremail;
			next();
		}
	);
};
