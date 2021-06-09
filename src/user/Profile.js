import React, { useState } from "react";
import icla1 from "../img/ic_launcher1.png";
import icla from "../img/ic_launcher.png";
import { getuser, signout, updateprofile } from "../auth/helper";
import "../Profile.css";
const Profile = () => {
	const [values, setValues] = useState({
		add: "",
		cit: "",
		pin: "",

		error: "",
		phone: "",
		success: false,
	});
	const {
		add,
		cit,
		pin,
		phone,

		error,
		success,
	} = values;

	const { user } = JSON.parse(localStorage.getItem("jwt"));
	const { email, name, mobileno, rollno, batch, address, city, pincode } =
		JSON.parse(localStorage.getItem("details"));

	const handleChange = (kname) => (event) => {
		setValues({ ...values, error: false, [kname]: event.target.value });
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
	const successMessage = () => {
		return (
			<div className="row">
				<div className="row px-5">
					<div
						className="alert alert-success"
						style={{ display: success ? "" : "none" }}
					>
						Your profile successfully updated
					</div>
				</div>
			</div>
		);
	};

	const onSubmit = (event) => {
		console.log(add, pin, cit, phone);
		event.preventDefault();
		setValues({ ...values, error: false });
		if (!add || !pin || !cit || !phone) {
			setValues({ error: "Please fill all the entries" });
		} else {
			updateprofile(user.role, user._id, phone, add, cit, pin)
				.then((data) => {
					if (data.error) {
						setValues({ ...values, error: data.error, success: false });
					} else {
						setValues({
							...values,
							success: true,
						});
						// city = cit;
						// address = add;
						// pincode = pin;
					}
				})
				.catch();
		}
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
				<div className="col-sm-10 color h">
					<div className="profile">
						<h1 className="heading">
							{" "}
							<img
								src="/undraw_Profile_data_re_v81r.svg"
								class="img-fluid image"
								alt="profile img"
							></img>{" "}
							&nbsp;MY PROFILE{" "}
						</h1>
						<div className="row">
							{successMessage()},{errorMessage()}
						</div>

						<form className="row g-3 ">
							<div className="col-sm-5 ">
								<label className="form-label">NAME</label>
								<input
									type="text"
									className="form-control"
									value={name}
									readOnly
									id="inputEmail4"
								/>
							</div>
							{user.role === 0 && (
								<div className="col-sm-5 ">
									<label htmlFor="inputPassword4" className="form-label">
										ROLL NUMBER
									</label>
									<input
										type="text"
										className="form-control"
										value={rollno}
										readOnly
										id="inputPassword4"
									/>
								</div>
							)}
							<div className="col-sm-5 ">
								<label htmlFor="inputEmail4" className="form-label">
									MOBILE NUMBER
								</label>
								<input
									type="number"
									className="form-control"
									placeholder={mobileno}
									onChange={handleChange("phone")}
									id="inputEmail4"
								/>
							</div>
							{user.role === 0 && (
								<div className="col-sm-5 ">
									<label htmlFor="inputPassword4" className="form-label">
										BATCH{" "}
									</label>
									<input
										type="text"
										className="form-control"
										value={batch}
										readOnly
										id="inputPassword4"
									/>
								</div>
							)}
							<div className="col-sm-5 ">
								<label htmlFor="inputAddress" className="form-label">
									EMAIL
								</label>
								<input
									type="email"
									className="form-control"
									id="inputAddress"
									value={email}
									readOnly
									placeholder="@gmail.com"
								/>
							</div>
							<div className="col-sm-7 ">
								<label htmlFor="inputAddress2" className="form-label">
									ADDRESS{" "}
								</label>
								<input
									type="text"
									className="form-control"
									value={add}
									onChange={handleChange("add")}
									id="inputAddress2"
									placeholder={address}
								/>
							</div>
							<div className="col-sm-5 ">
								<label htmlFor="inputCity" className="form-label">
									CITY
								</label>
								<input
									type="text"
									className="form-control"
									value={cit}
									onChange={handleChange("cit")}
									placeholder={city}
									id="inputCity"
								/>
							</div>
							<div className="col-sm-3 ">
								<label htmlFor="inputZip" className="form-label">
									PINCODE
								</label>
								<input
									type="text"
									className="form-control"
									id="inputZip"
									value={pin}
									placeholder={pincode}
									onChange={handleChange("pin")}
								/>
							</div>
							<div className="col-sm-12 button">
								<button
									type="submit"
									className="btn btn-primary"
									onClick={onSubmit}
								>
									UPDATE
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Profile;
