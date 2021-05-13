import React, { useState } from "react";
import "../Card.css";
import { Card } from "semantic-ui-react";
import icla1 from "../img/ic_launcher1.png";
import icla from "../img/ic_launcher.png";
import { getuser, signout } from "../auth/helper";
import x1 from "../img/undraw_annotation_7das.svg";

// var rootStyle = {
// 	height: "100vh",
// 	backgroundColor: "#dae8df",
// };
const StudentDashBoard = () => {
	var date = new Date();
	var weekday = new Array(7);
	weekday[0] = "sunday";
	weekday[1] = "monday";
	weekday[2] = "tuesday";
	weekday[3] = "wednesday";
	weekday[4] = "thursday";
	weekday[5] = "friday";
	weekday[6] = "saturday";

	var n = weekday[date.getDay()];
	if (date.getDay() === 6) {
		n = "monday";
	}
	if (date.getDay() === 0) {
		n = "monday";
	}

	const [values, setValues] = useState({
		email: "",
		name: "",
		sec: "",
		usrname: "",
		batch: "",
		timetable: "",
	});
	const { sec, timetable, usrname } = values;

	const { user, token } = JSON.parse(localStorage.getItem("jwt"));

	const getUser = () => {
		getuser(user._id, token, user.role)
			.then((data) => {
				if (!data.error) {
					!timetable && localStorage.setItem("details", JSON.stringify(data));
					setValues({
						...values,
						email: data.email,
						name: data.name,
						sec: data.sec,
						usrname: data.name,
						batch: data.batch,
						timetable: data.timetable[0]["day"][n],
					});
				}
			})
			.catch();
	};
	function Listrender() {
		// Build an array of items
		let array = [];
		let time = timetable["timetable"];
		let room = timetable["roomno"];
		let teacher = timetable["teacher"];
		time.map((d, index) => {
			array.push(
				<Card.Group>
					<Card color="teal">
						<Card.Content>
							<Card.Header>
								{index + 1}. {d}
							</Card.Header>
							<Card.Meta>{teacher[index]}</Card.Meta>
							<Card.Description>{room[index]}</Card.Description>
						</Card.Content>
					</Card>
				</Card.Group>
			);
		});

		// Render it
		return array;
	}
	getUser();
	return (
		<div>
			<header>
				{user.role === 0 && (
					<nav className="navbar navbar-light bg-light">
						<a className="navbar-brand" href="/studentdashboard">
							<img
								src={icla}
								width="30"
								height="30"
								className="d-inline-block align-top"
								alt=""
							/>
							Student Dashboard
						</a>
					</nav>
				)}
				{user.role === 1 && (
					<nav className="navbar navbar-light bg-light">
						<a className="navbar-brand" href="/teacherdashboard">
							<img
								src={icla1}
								width="30"
								height="30"
								className="d-inline-block align-top"
								alt=""
							/>
							Teacher Dashboard
						</a>
					</nav>
				)}
			</header>
			<div className="row">
				{
					<div className="col-sm-2">
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
									signout(() => {
										localStorage.removeItem("details");
									});
								}}
							>
								<i className="fas fa-sign-out-alt"></i>&nbsp;Logout
							</a>
						</div>
					</div>
				}
				<div className="col-sm-10 color h">
					<div className="App color h ">
						<div className="container " height="1050px">
							<div className="classalot ">
								<h1 className="heading">
									{" "}
									<img
										src={x1}
										class="img-fluid image"
										alt="profile img"
										width="250"
										height="250"
									></img>{" "}
									&nbsp; DASHBOARD{" "}
								</h1>

								<div class="row m-3 ">
									<div class="col-sm-6">
										<div class="card">
											<div class="card-body color">
												<h5 class="card-title">
													Hello {usrname}
													<br /> Your Notifications
												</h5>
												<p class="card-text"></p>
											</div>
										</div>
									</div>
									<div class="col-sm-6">
										<div class="card">
											<div class="card-body color">
												{user.role === 0 && (
													<h5 className="card-title">
														Classroom Allotted for {sec} ({n})
													</h5>
												)}
												{user.role === 1 && (
													<h5 className="card-title">Classroom Allotted</h5>
												)}
												{timetable && Listrender()}
												<p className="card-text"></p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/*<div className="col-sm-10" style={rootStyle}>
					<div className="row m-3">
						<div className="col-sm-6">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">
										Hello {usrname}
										<br /> Your Notifications
									</h5>
									<p className="card-text"></p>
								</div>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="card">
								<div className="card-body">
									{user.role === 0 && (
										<h5 className="card-title">
											Classroom Allotted for {sec} ({n})
										</h5>
									)}
									{user.role === 1 && (
										<h5 className="card-title">Classroom Allotted</h5>
									)}
									{timetable && Listrender()}
									<p className="card-text"></p>
								</div>
							</div>
						</div>
					</div>
				</div>*/}
			</div>
		</div>
	);
};
export default StudentDashBoard;
