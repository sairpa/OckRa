import { API } from "../../backend";
export const signin = (user) => {
	console.log("enfen");
	return fetch(`${API}/signin`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			console.log("inside");
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

export const updateprofile = (id, studentinfo, mobileno) => {
	const info = { studentinfo, mobileno };
	return fetch(`${API}/${id}/updateprofile`, {
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

export const getuser = (id, token) => {
	return fetch(`${API}/student/${id}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			//console.log(response.json());
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
