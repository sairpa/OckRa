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
