import { API } from "../../backend";
export const signin = (user) => {
	return fetch(`${API}/signin`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};
export const authenticate = (data, next) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("jwt", JSON.stringify(data));
		next();
	}
};
export const isAuthenticated = () => {
	if (typeof window == "undefined") {
		return false;
	}
	if (localStorage.getItem("jwt")) {
		return JSON.parse(localStorage.getItem("jwt"));
	} else {
		return false;
	}
};
export const signout = (next) => {
	if (typeof window !== "undefined") {
		localStorage.removeItem("jwt");
		localStorage.removeItem("details");
		next();
		return fetch(`${API}/signout`, {
			method: "GET",
		})
			.then(console.log("signout success"))
			.catch((err) => console.log(err));
	}
};

export const resetpass = (email, token, password) => {
	const info = { email, token, password };
	console.log(`${API}/reset/${email}/${token}`);
	return fetch(`${API}/reset/${email}/${token}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(info),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateprofile = (role, id, mobileno, address, city, pincode) => {
	const info = { mobileno, address, city, pincode };
	var k;
	if (role === 1) {
		k = "teacher/" + id;
		console.log(`${API}/${k}/updateprofile`);
	} else {
		k = id;
	}
	return fetch(`${API}/${k}/updateprofile`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(info),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getuser = (id, token, role) => {
	if (role === 0) {
		return fetch(`${API}/student/${id}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				return response.json();
			})
			.catch((err) => console.log(err));
	} else {
		return fetch(`${API}/teacher/${id}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				return response.json();
			})
			.catch((err) => console.log(err));
	}
};

export const getTeacher = (id, token) => {
	return fetch(`${API}/teacher/${id}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const forgotpassword = (email) => {
	let info = { email };
	return fetch(`${API}/forgotpassword`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(info),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const teachertimetable = (timetable) => {
	return fetch(`${API}/search/teachertimetable`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(timetable),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const sectiontimetable = (timetable) => {
	return fetch(`${API}/search/sectiontimetable`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(timetable),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};
export const user_feedback = (role, userid, token, feedback) => {
	if (role === 0) {
		return fetch(`${API}/student/${userid}/feedback`, {
			method: "POST",

			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ user_feedback: feedback }),
		})
			.then((response) => {
				return response.json();
			})
			.catch((err) => console.log(err));
	}
	if (role === 1) {
		return fetch(`${API}/teacher/${userid}/feedback`, {
			method: "POST",

			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ user_feedback: feedback }),
		})
			.then((response) => {
				return response.json();
			})
			.catch((err) => console.log(err));
	}
};

export const request_pull = (sec, batch, name, day) => {
	console.log(sec, batch, name, day);
	return fetch(`${API}/request`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ sec: sec, batch: batch, name: name, day: day }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const update_request = (sec, batch, name, day, from, to) => {
	return fetch(`${API}/submitrequest`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			sec: sec,
			batch: batch,
			tname: name,
			day: day,
			from: from,
			to: to,
		}),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};
