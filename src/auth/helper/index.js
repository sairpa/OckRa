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

export const teachertimetable = (timetable)=>{
	return fetch(`${API}/search/teachertimetable`,{
		method:"POST",
		headers:{
			Accept:"application/json",
			"Content-Type":"application/json",
		},
		body:JSON.stringify(timetable),
	})
	.then((response)=>{
		return response.json()
	})
	.catch((err)=>console.log(err))
}

export const sectiontimetable = (timetable)=>{
	return fetch(`${API}/search/sectiontimetable`,{
		method:"POST",
		headers:{
			Accept:"application/json",
			"Content-Type":"application/json",
		},
		body:JSON.stringify(timetable),
	})
	.then((response)=>{
		return response.json()
	})
	.catch((err)=>console.log(err))
}

export const user_feedback=(role,userid,token,feedback)=>{
	if(role===0){
		return fetch(`${API}/student/${userid}/feedback`, {
			method: "POST",
			//mode:"no-cors",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({user_feedback:feedback}),
			
		})
			.then(response => {
				return response.json();
			})
			.catch((err) => console.log(err));
	}
	if(role===1){
		return fetch(`${API}/teacher/${userid}/feedback`, {
			method: "POST",
			//mode:"no-cors",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({user_feedback:feedback}),
			
		})
			.then(response => {
				return response.json();
			})
			.catch((err) => console.log(err));
	}
}


