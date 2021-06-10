const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

describe("Student Login testing", () => {
	test("Is a student?", async (done) => {
		const res = await request.post("/api/signin").send({
			email: "cb.en.u4cse18129@cb.students.amrita.edu",
			password: "admin123",
		});
		expect(res.status).toBe(200);
		expect(res.body.user.role).toBe(0);
		expect(res.body.user.name).not.toBeFalsy();

		done();
	}, 30000);

	//test("Email matching", async (done) => {});
});

it("signout succesfull", async (done) => {
	const response = await request.get("/api/signout");

	expect(response.status).toBe(200);
	expect(response.text).toBe('"User logout Succesful"');
	done();
});

describe("Teacher Login testing", () => {
	test("Is a teacher?", async (done) => {
		const res = await request.post("/api/signin").send({
			email: "cb.en.u4cse18129@cb.amrita.edu",
			password: "admin123",
		});
		expect(res.status).toBe(200);
		expect(res.body.user.role).toBe(1);
		expect(res.body.user.name).not.toBeFalsy();

		done();
	}, 30000);

	//test("Email matching", async (done) => {});
});

//Not a valid user

describe("invalid user", () => {
	test("Wrong password/wrong email/not a user", async (done) => {
		const res = await request.post("/api/signin").send({
			email: "absw@gmail.com",
			password: "admin123",
		});
		expect(res.status).toBe(400);
		expect(res.body.user).toBeFalsy();
		expect(res.body.error).not.toBeFalsy();

		done();
	}, 30000);

	//test("Email matching", async (done) => {});
});

//Get student timetable
describe("Student timetable", () => {
	let sec = "B";
	let batch = "2018";
	test("Valid section and batch", async (done) => {
		const res = await request.post("/api/search/sectiontimetable").send({
			sec: sec,
			batch: batch,
		});
		expect(res.text).not.toBeFalsy();
		expect(res.body.error).toBeFalsy();
		done();
	}, 30000);
});
//Teacher Timetable check
describe("Teacher timetable", () => {
	test("Valid section and batch", async (done) => {
		const res = await request.post("/api/search/teachertimetable").send({
			name: "Logeshwaran R",
		});
		expect(res.text).not.toBeFalsy();
		expect(res.body.error).toBeFalsy();
		done();
	}, 30000);
});

//Invalid sec or Batch name
describe("Invalid section or Batch", () => {
	let sec = "98";
	let batch = "sec";
	test("Valid section and batch", async (done) => {
		const res = await request.post("/api/search/sectiontimetable").send({
			sec: sec,
			batch: batch,
		});
		expect(res.body.error).not.toBeFalsy();
		expect(res.status).toBe(400);
		done();
	}, 30000);
});

describe("Invalid Teacher timetable", () => {
	test("Wrong Teacher", async (done) => {
		const res = await request.post("/api/search/teachertimetable").send({
			name: "AB",
		});
		expect(res.text).not.toBeFalsy();
		expect(res.body.error).not.toBeFalsy();
		done();
	}, 30000);
});

//////////////////////User Test///////////////////////////////////////////////////////////////////

var token;
describe("Feedback check", () => {
	test("Entering feedback?", async (done) => {
		const res0 = await request.post("/api/signin").send({
			email: "cb.en.u4cse18129@cb.students.amrita.edu",
			password: "admin123",
		});

		let token = res0.body.token;
		let studentid = res0.body.user._id;

		const res = await request
			.post(`/api/student/${studentid}/feedback`)
			.send({
				email: "cb.en.u4cse18129@cb.students.amrita.edu",
				user_feedback: "superbad",
			})
			.set("Authorization", `Bearer ${token}`);
		expect(res.status).toBe(200);
		expect(res.body.error).toBeFalsy();
		expect(res.body.feedback).not.toBeFalsy();

		done();
	}, 30000);
});

describe("Profile Update check", () => {
	test("Student Profile updation?", async (done) => {
		const res0 = await request.post("/api/signin").send({
			email: "cb.en.u4cse18129@cb.students.amrita.edu",
			password: "admin123",
		});

		let token = res0.body.token;
		let studentid = res0.body.user._id;
		const res = await request
			.post(`/api/${studentid}/updateprofile`)
			.send({
				email: "cb.en.u4cse18129@cb.students.amrita.edu",
				address: "no 3 natesan nagar,thirupapuliyur",
				city: "Cuddalore",
				pincode: "607002",
				mobileno: "6382438317",
			})
			.set("Authorization", `Bearer ${token}`);
		expect(res.status).toBe(200);
		expect(res.body.error).toBeFalsy();
		expect(res.body.profile).not.toBeFalsy();

		done();
	}, 30000);
});

describe("Profile Update check", () => {
	test("Teacher Profile updation?", async (done) => {
		const res0 = await request.post("/api/signin").send({
			email: "MR_Y@cb.amrita.edu",
			password: "admin123",
		});

		let token = res0.body.token;
		let teacherid = res0.body.user._id;
		//console.log(token, teacherid);
		const res = await request
			.post(`/api/teacher/${teacherid}/updateprofile`)
			.send({
				email: "MR_Y@cb.amrita.edu",
				address: "address",
				city: "city",
				pincode: "pincode",
				mobileno: "12345",
			})
			.set("Authorization", `Bearer ${token}`);
		expect(res.status).toBe(200);
		expect(res.body.error).toBeFalsy();
		expect(res.body.profile).not.toBeFalsy();

		done();
	}, 30000);
});

describe("Teacher Feedback check", () => {
	test("Entering feedback?", async (done) => {
		const res0 = await request.post("/api/signin").send({
			email: "MR_Y@cb.amrita.edu",
			password: "admin123",
		});

		let token = res0.body.token;
		let studentid = res0.body.user._id;

		const res = await request
			.post(`/api/teacher/${studentid}/feedback`)
			.send({
				email: "MR_Y@cb.amrita.edu",
				user_feedback: "Good effort",
			})
			.set("Authorization", `Bearer ${token}`);
		expect(res.status).toBe(200);
		expect(res.body.error).toBeFalsy();
		expect(res.body.feedback).not.toBeFalsy();

		done();
	}, 30000);
});

describe("Forgot password", () => {
	test("valid emailid", async (done) => {
		const res = await request.post("/api/forgotpassword").send({
			email: "waran715@gmail.com",
		});
		token = res.body.token;
		expect(res.status).toBe(200);
		expect(res.body.error).toBeFalsy();
		expect(res.text).not.toBeFalsy();

		done();
	}, 100000);
});

describe("Reset password", () => {
	let email = "waran715@gmail.com";
	let token = 1234;
	test("valid token", async (done) => {
		const res = await request.post(`/api/reset/${email}/${token}`).send({
			password: "admin123",
		});

		expect(res.body.error).not.toBeFalsy();
		expect(res.text).not.toBeFalsy();

		done();
	}, 100000);
});

describe("Reset password", () => {
	let email = "waran715@gmail.com";
	test("valid token", async (done) => {
		const res = await request.post(`/api/reset/${email}/${token}`).send({
			password: "admin123",
		});

		expect(res.status).toBe(200);
		expect(res.body.error).toBeFalsy();
		expect(res.text).not.toBeFalsy();

		done();
	}, 100000);
});

describe("Submit request", () => {
	test("req submit", async (done) => {
		const res = await request.post("/api/submitrequest").send({
			tname: "Unit test",
			day: "Unit test",
			sec: "Unit test",
			batch: "Unit test",
			from: "Unit test",
			to: "Unit test",
		});

		expect(res.status).toBe(200);
		expect(res.body.error).toBeFalsy();
		expect(res.text).not.toBeFalsy();

		done();
	}, 100000);
});

describe("Student Notification", () => {
	test("Empty notification", async (done) => {
		const res = await request.post("/api/student/notification").send({
			day: "monday",
			sec: "B",
			batch: "2018",
		});

		expect(res.status).toBe(200);
		expect(res.body.error).toBeFalsy();
		expect(res.body.msg1).toBe("No notifications");

		done();
	}, 30000);
});

describe("Student Notification", () => {
	test("Non-empty notification", async (done) => {
		const res = await request.post("/api/student/notification").send({
			day: "saturday",
			sec: "B",
			batch: "2018",
		});

		expect(res.status).toBe(200);
		expect(res.body.error).toBeFalsy();
		expect(res.body.msg1).toBeFalsy();
		expect(res.body.msg).not.toBeFalsy();

		done();
	}, 30000);
});

describe("Teacher Notification", () => {
	test("empty notification", async (done) => {
		const res = await request.post("/api/teacher/notification").send({
			day: "monday",
			tname: "MR_Y",
		});

		expect(res.status).toBe(200);
		expect(res.body.error).toBeFalsy();
		expect(res.body.msg1).toBe("No notifications");
		expect(res.body.msg).toBeFalsy();

		done();
	}, 30000);
});

describe("Teacher Notification", () => {
	test("non-empty notification", async (done) => {
		const res = await request.post("/api/teacher/notification").send({
			day: "saturday",
			tname: "MR_Y",
		});

		expect(res.status).toBe(200);
		expect(res.body.error).toBeFalsy();
		expect(res.body.msg).not.toBeFalsy();
		expect(res.body.msg1).toBeFalsy();

		done();
	}, 30000);
});
