const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
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
	test("Profile updation?", async (done) => {
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
				studentinfo: "I am batman",
				mobileno: "6382438317",
			})
			.set("Authorization", `Bearer ${token}`);
		expect(res.status).toBe(200);
		expect(res.body.error).toBeFalsy();
		expect(res.body.profile).not.toBeFalsy();

		done();
	}, 30000);
});
