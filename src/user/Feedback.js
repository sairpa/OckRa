import React, { useState } from "react";
import "../App.css";
import "../Profile.css";
import { Link } from "react-router-dom";
import { user_feedback, signout, isAuthenticated } from "../auth/helper";
import icla1 from "../img/ic_launcher1.png";
import icla from "../img/ic_launcher.png";

var rootStyle = {
	height: "100vh",
	backgroundColor: "#dae8df",
};
const Feedback = () => {
	const { user } = JSON.parse(localStorage.getItem("jwt"));
	const token = isAuthenticated() && isAuthenticated().token;

	const [values, setValues] = useState({
		feedback: "",
		error: "",
		success: false,
	});
	const { feedback, error, success } = values;
	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const errorMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div
						className="alert alert-danger"
						style={{ display: error ? "" : "none" }}
					>
						{error}
					</div>
				</div>
			</div>
		);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false });
		if (!feedback) {
			setValues({ error: "Please enter the feedback before submitting" });
		} else {
			user_feedback(user.role, user._id, token, feedback)
				.then((data) => {
					if (data.error) {
						setValues({ ...values, error: data.error, success: false });
					} else {
						setValues({
							...values,
							success: true,
							feedback: "",
						});
					}
				})
				.catch();
		}
	};

	const successMessage = () => {
		return (
			<div className="row">
				<div className="row px-5">
					<div
						className="alert alert-success"
						style={{ display: success ? "" : "none" }}
					>
						Thanks for the feedback given.
					</div>
				</div>
			</div>
		);
	};
	return (
		<div>
			<header>
				<nav class="navbar navbar-light bg-light">
					{isAuthenticated() && isAuthenticated().user.role === 0 && (
						<div class="navbar-brand">
							<img
								src={icla}
								width="30"
								height="30"
								class="d-inline-block align-top"
								alt=""
							/>
							<Link
								to="/studentdashboard"
								className="px-4"
								style={{ color: "#000000" }}
							>
								Student Dashboard
							</Link>
						</div>
					)}
					{isAuthenticated() && isAuthenticated().user.role === 1 && (
						<div class="navbar-brand">
							<img
								src={icla1}
								width="30"
								height="30"
								class="d-inline-block align-top"
								alt=""
							/>
							<Link
								to="/teacherdashboard"
								className="px-4"
								style={{ color: "#000000" }}
							>
								Teacher Dashboard
							</Link>
						</div>
					)}
				</nav>
			</header>
			<div className="row">
				<div className="col-sm-2">
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
								signout(() => {
									localStorage.removeItem("details");
								});
							}}
						>
							<i class="fas fa-sign-out-alt"></i>&nbsp;Logout
						</a>
					</div>
				</div>
				<div className="col-sm-10 color h">
					<h1 className="head p">
						<img
							src="/undraw_feedback_h2ft.svg"
							class="img-fluid image"
							alt="feedback img"
						></img>{" "}
						&nbsp;FEEDBACK
					</h1>

					<div className="row">
						<div className="col-md-6 offset-sm-3 text-left">
							<form>
								{successMessage()},{errorMessage()}
								<div className="form-group">
									<label>Feedback</label>
									<textarea
										class="form-control"
										id="exampleFormControlTextarea1"
										rows="5"
										type="text"
										value={feedback}
										onChange={handleChange("feedback")}
									></textarea>
								</div>
								{isAuthenticated() && isAuthenticated().user.role === 1 && (
									<button
										className="btn btn-success btn-block"
										onClick={onSubmit}
									>
										Submit
									</button>
								)}
								{isAuthenticated() && isAuthenticated().user.role === 0 && (
									<button
										className="btn btn-success btn-block"
										onClick={onSubmit}
									>
										Submit
									</button>
								)}
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Feedback;
