const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
describe("Feedback check", () => {
	let studentid = "6065d9d87ca7e02231f427d5";
	test("Entering feedback?", async (done) => {
		const res0 = await request.post("/api/signin").send({
			email: "cb.en.u4cse18129@cb.students.amrita.edu",
			password: "admin123",
		});
		/*const res = await request
			.post("/api/student/6065d9d87ca7e02231f427d5/feedback")
			.send({
				email: "cb.en.u4cse18129@cb.students.amrita.edu",
			});*/
		//expect(res.status).toBe(200);
		let token = res0.body.token;
		const res = await request
			.post("/api/student/6065d9d87ca7e02231f427d5/feedback")
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

	//test("Email matching", async (done) => {});
});

describe("Profile Update check", () => {
	let studentid = "6065d9d87ca7e02231f427d5";

	test("Profile updation?", async (done) => {
		const res0 = await request.post("/api/signin").send({
			email: "cb.en.u4cse18129@cb.students.amrita.edu",
			password: "admin123",
		});

		//expect(res.status).toBe(200);
		let token = res0.body.token;
		const res = await request
			.post("/api/6065d9d87ca7e02231f427d5/updateprofile")
			.send({
				email: "cb.en.u4cse18129@cb.students.amrita.edu",
				studentinfo: "I am batman",
				mobileno: "6382438317",
			})
			.set("Authorization", `Bearer ${token}`);
		expect(res.status).toBe(200);
		expect(res.body.error).toBeFalsy();
		expect(res.body.profile).not.toBeFalsy();

		done();
	}, 30000);

	//test("Email matching", async (done) => {});
});

/*describe("Forgot password mail sendind...", () => {
	test("Got mail?", async (done) => {
		const res = await request.post("/api/forgotpassword").send({
			email: "waran715@gmail.com",
		});
		expect(res.status).toBe(200);
		expect(res.body.error).toBeFalsy();
	}, 100000);
});*/
