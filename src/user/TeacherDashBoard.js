import React, { useState } from "react";
//import Base from "../core/Base";
//import Jumbotron from "react-bootstrap/Jumbotron";
import "../App.css";

import icla from "../img/ic_launcher.png";
import { getTeacher, signout } from "../auth/helper";

var rootStyle = {
	height: "100vh",
	backgroundColor: "#dae8df",
};
const TeacherDashBoard = () => {
	var d = new Date();
	var weekday = new Array(7);
	weekday[0] = "sunday";
	weekday[1] = "monday";
	weekday[2] = "tuesday";
	weekday[3] = "wednesday";
	weekday[4] = "thursday";
	weekday[5] = "friday";
	weekday[6] = "saturday";

	var n = weekday[d.getDay()];
	if (d.getDay() === 6) {
		n = "monday";
	}
	if (d.getDay() === 0) {
		n = "monday";
	}
	//console.log(n);
	const [values, setValues] = useState({
		email: "",
		name: "",
		usrname: "",
		timetable: "",
	});
	const { email, error, timetable, usrname } = values;

	const { user, token } = JSON.parse(localStorage.getItem("jwt"));
	var test = 1;
	//console.log(test);
	//console.log(token);
	//console.log(user.name);
	const getUser = () => {
		getTeacher(user._id, token)
			.then((data) => {
				if (!data.error) {
					//console.log("wrws", test);
					//console.log(data.sec, data.mobileno);

					!timetable && localStorage.setItem("details", JSON.stringify(data));
					setValues({
						...values,
						email: data.email,
						name: data.name,
						usrname: data.name,
						timetable: data.timetable[0].timetable[n],
					});
				}
			})
			.catch();
	};
	function Listrender() {
		// Build an array of items
		//let array = [];
		const listItems = timetable.map((d, index) => <ol key={index}>{d}</ol>);

		// Render it
		return <div>{listItems}</div>;
	}
	return (
		<div>
			{getUser()}
			<header>
				<nav className="navbar navbar-light bg-light">
					<a className="navbar-brand" href="/teacherdashboard">
						<img
							src={icla}
							width="30"
							height="30"
							className="d-inline-block align-top"
							alt=""
						/>
						Teacher Dashboard
					</a>
				</nav>
			</header>
			<div className="row">
				<div className="col-sm-1.8">
					<div
						className="nav flex-column nav-pills"
						id="v-pills-tab"
						role="tablist"
						aria-orientation="vertical"
					>
						<a
							className="nav-link active"
							id="v-pills-home-tab"
							data-toggle="pill"
							href="/"
							role="tab"
							aria-controls="v-pills-home"
							aria-selected="true"
						>
							<i className="fas fa-home"></i>&nbsp;Home
						</a>
						<a
							className="nav-link text-body"
							id="v-pills-profile-tab"
							data-toggle="pill"
							href="/profile"
							role="tab"
							aria-controls="v-pills-profile"
							aria-selected="false"
						>
							<i className="fas fa-user"></i>&nbsp;Profile
						</a>
						<a
							className="nav-link text-body"
							id="v-pills-messages-tab"
							data-toggle="pill"
							href="/feedback"
							role="tab"
							aria-controls="v-pills-messages"
							aria-selected="false"
						>
							<i className="fas fa-book-open"></i>&nbsp;Feedback
						</a>
						<a
							className="nav-link text-body"
							id="v-pills-settings-tab"
							data-toggle="pill"
							href="/login"
							role="tab"
							aria-controls="v-pills-settings"
							aria-selected="false"
							onClick={() => {
								localStorage.removeItem("details");
								signout(() => {});
							}}
						>
							<i className="fas fa-sign-out-alt"></i>&nbsp;Logout
						</a>
					</div>
				</div>
				<div className="col-sm-11" style={rootStyle}>
					<div className="row m-3">
						<div className="col-sm-6">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">
										Hello {user.name} <br /> Your Notifications
									</h5>
									<p className="card-text"></p>
								</div>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Classroom Allotted</h5>
									{timetable && Listrender()}
									<p className="card-text"></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default TeacherDashBoard;
