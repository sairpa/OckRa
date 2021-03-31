import React from "react";
//import Base from "../core/Base";
//import Jumbotron from "react-bootstrap/Jumbotron";
import "../App.css";

import icla from "../img/ic_launcher.png";
import { signout } from "../auth/helper";
var rootStyle = {
	height: "100vh",
	backgroundColor: "#dae8df",
};
const StudentDashBoard = () => {
	const { user } = JSON.parse(localStorage.getItem("jwt"));
	//console.log(user.name);
	return (
		<div>
			<header>
				<nav class="navbar navbar-light bg-light">
					<a class="navbar-brand" href="/studentdashboard">
						<img
							src={icla}
							width="30"
							height="30"
							class="d-inline-block align-top"
							alt=""
						/>
						Student Dashboard
					</a>
				</nav>
			</header>
			<div className="row">
				<div className="col-sm-1.8">
					<div
						class="nav flex-column nav-pills"
						id="v-pills-tab"
						role="tablist"
						aria-orientation="vertical"
					>
						<a
							class="nav-link active"
							id="v-pills-home-tab"
							data-toggle="pill"
							href="/"
							role="tab"
							aria-controls="v-pills-home"
							aria-selected="true"
						>
							<i class="fas fa-home"></i>&nbsp;Home
						</a>
						<a
							class="nav-link text-body"
							id="v-pills-profile-tab"
							data-toggle="pill"
							href="/profile"
							role="tab"
							aria-controls="v-pills-profile"
							aria-selected="false"
						>
							<i class="fas fa-user"></i>&nbsp;Profile
						</a>
						<a
							class="nav-link text-body"
							id="v-pills-messages-tab"
							data-toggle="pill"
							href="/feedback"
							role="tab"
							aria-controls="v-pills-messages"
							aria-selected="false"
						>
							<i class="fas fa-book-open"></i>&nbsp;Feedback
						</a>
						<a
							class="nav-link text-body"
							id="v-pills-settings-tab"
							data-toggle="pill"
							href="/login"
							role="tab"
							aria-controls="v-pills-settings"
							aria-selected="false"
							onClick={() => {
								signout(() => {});
							}}
						>
							<i class="fas fa-sign-out-alt"></i>&nbsp;Logout
						</a>
					</div>
				</div>
				<div className="col-sm-11" style={rootStyle}>
					<div class="row m-3">
						<div class="col-sm-6">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">
										Hello {user.name} <br /> Your Notifications
									</h5>
									<p class="card-text"></p>
								</div>
							</div>
						</div>
						<div class="col-sm-6">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Classroom Allotted</h5>
									<p class="card-text"></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default StudentDashBoard;
