import React, { useState } from "react";
import "../Card.css";
import { Card } from "semantic-ui-react";
import icla1 from "../img/ic_launcher1.png";
import icla from "../img/ic_launcher.png";
import { getuser, signout, request_pull, update_request } from "../auth/helper";
import x1 from "../img/undraw_Accept_request_re_d81h.svg";
import { Dropdown, ButtonGroup, Button } from "react-bootstrap";

const Request = () => {
	const { user, token } = JSON.parse(localStorage.getItem("jwt"));
	const [values, setValues] = useState({
		day: "",
		sec: "",
		batch: "",
		to: "",
		from: "",
		error: "",
		success: false,
		pull: "",
		flag: "",
	});
	const { day, sec, batch, to, from, error, success, pull, flag } = values;
	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false });
		if (!day || !sec || !batch) {
			setValues({
				...values,
				error: "Please check if u have filled section,batch and day column",
			});
		} else {
			request_pull(sec, batch, user.name, day)
				.then((data) => {
					if (data.error) {
						setValues({ ...values, error: data.error, success: false });
					} else {
						setValues({
							...values,
							success: false,
							pull: data,
							flag: true,
						});
					}
				})
				.catch();
		}
	};

	const onSubmit1 = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false });
		if (!day || !sec || !batch || !from || !to) {
			setValues({
				...values,
				error: "Please check if u have filled all the columns",
			});
		} else {
			update_request(sec, batch, user.name, day, from, to)
				.then((data) => {
					if (data.error) {
						setValues({ ...values, error: data.error, success: false });
					} else {
						setValues({
							...values,
							success: true,
							flag: "",
							flag1: false,
						});
					}
				})
				.catch();
		}
	};

	const periods = () => {
		let arr = [];
		var i = 0;
		for (i = 0; i < pull.period.length; i++) {
			arr.push(<option value={pull.period[i]}>{pull.period[i]}</option>);
		}
		return arr;
	};

	const free_periods = () => {
		let arr = [];
		var i = 0;
		for (i = 0; i < pull.free_periods.length; i++) {
			arr.push(
				<option value={pull.free_periods[i]}>{pull.free_periods[i]}</option>
			);
		}
		return arr;
	};

	const successMessage = () => {
		return (
			<div className="row">
				<div className="row px-5">
					<div
						className="alert alert-success"
						style={{ display: success ? "" : "none" }}
					>
						request has been sent sucessfully.Please wait till the request is
						processed.
					</div>
				</div>
			</div>
		);
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
							{user.role === 1 && (
								<a
									className="nav-link text-body"
									id="v-pills-messages-tab"
									data-toggle="pill"
									href="/requests"
									role="tab"
									aria-controls="v-pills-messages"
									aria-selected="false"
								>
									<i className="fas fa-book-open"></i>&nbsp;Request
								</a>
							)}
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
				{
					<div className="col-sm-10 color h">
						<div className="profile">
							<h1 className="heading">
								{" "}
								<img
									src={x1}
									class="img-fluid image"
									alt="request img"
								></img>{" "}
								&nbsp;Request{" "}
							</h1>
							{successMessage()},{errorMessage()}
							<label htmlFor="inputAddress">DAY</label>
							<div class="input-group mb-3">
								<select
									class="custom-select"
									id="inputGroupSelect02"
									onChange={handleChange("day")}
								>
									<option selected>Choose...</option>
									<option value="monday">monday</option>
									<option value="tuesday">tuesday</option>
									<option value="wednesday">wednesday</option>
									<option value="thursday">thursday</option>
									<option value="friday">friday</option>
								</select>
							</div>
							<label htmlFor="inputAddress">Section</label>
							<div class="input-group mb-3">
								<select
									class="custom-select"
									id="inputGroupSelect02"
									onChange={handleChange("sec")}
								>
									<option selected>Choose...</option>
									<option value="A">A</option>
									<option value="B">B</option>
									<option value="C">C</option>
									<option value="D">D</option>
									<option value="E">E</option>
								</select>
							</div>
							<label htmlFor="inputAddress">Batch</label>
							<div class="input-group mb-3">
								<select
									class="custom-select"
									id="inputGroupSelect02"
									onChange={handleChange("batch")}
								>
									<option selected>Choose...</option>
									<option value="2018">2018</option>
									<option value="2019">2019</option>
									<option value="2020">2020</option>
									<option value="2021">2021</option>
								</select>
							</div>
							<div>
								<button className="btn btn-success" onClick={onSubmit}>
									Pull Periods
								</button>
							</div>
							<label htmlFor="inputAddress">From</label>
							<div class="input-group mb-3">
								<select
									class="custom-select"
									id="inputGroupSelect02"
									onChange={handleChange("from")}
								>
									<option selected>Choose...</option>
									{day && batch && sec && flag && periods()}
								</select>
							</div>
							<label htmlFor="inputAddress">To</label>
							<div class="input-group mb-3">
								<select
									class="custom-select"
									id="inputGroupSelect02"
									onChange={handleChange("to")}
								>
									<option selected>Choose...</option>
									{day && batch && sec && flag && free_periods()}
								</select>
							</div>
							<div>
								<button className="btn btn-success" onClick={onSubmit1}>
									Submit Request
								</button>
							</div>
							<p className="text-white text-center">{JSON.stringify(values)}</p>
						</div>
					</div>
				}
			</div>
		</div>
	);
};
export default Request;
