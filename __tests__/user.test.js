const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
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
			day: "thursday",
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
			day: "thursday",
			tname: "MR_Y",
		});

		expect(res.status).toBe(200);
		expect(res.body.error).toBeFalsy();
		expect(res.body.msg).not.toBeFalsy();
		expect(res.body.msg1).toBeFalsy();

		done();
	}, 30000);
});
