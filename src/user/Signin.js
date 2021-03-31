import React, { useState } from "react";
import loginto from "../img/loginto.svg";
import Base from "../core/Base";
import { Link, Redirect, withRouter } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../auth/helper";

const Signin = () => {
	const [values, setValues] = useState({
		email: "",
		password: "",
		error: "",
		loading: false,
		didRedirect: false,
	});
	const { email, password, error, loading, didRedirect } = values;
	const { user } = isAuthenticated();
	const handleChange = (field) => (event) => {
		setValues({ ...values, error: false, [field]: event.target.value });
	};
	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		console.log("efefkmdl");
		signin({ email, password })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, loading: false });
				} else {
					authenticate(data, () => {
						setValues({ ...values, didRedirect: true });
					});
				}
			})
			.catch();
	};
	const errormessage = () => {
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
	const redirectto = () => {
		if (didRedirect) {
			if (user && user.role === 0) {
				return <Redirect to="/studentdashboard" />;
			} else {
				return <Redirect to="/teacherdashboard" />;
			}
		}
	};
	return (
		<div>
			<Base>
				<section className="login">
					<div className="container">
						{errormessage()}
						<div className="login-form" id="before-login">
							<div className="filler-content">
								<img className="loginto" src={loginto} alt=" " />
							</div>
							<div className="login-main-form">
								<form id="login-form" className="login-main-form">
									<h1>LOGIN</h1>
									<input
										type="email"
										value={email}
										onChange={handleChange("email")}
										placeholder="Email ID"
										id="login-email"
									/>
									<input
										type="password"
										placeholder="Password"
										id="login-password"
										value={password}
										onChange={handleChange("password")}
									/>
									<button type="submit" onClick={onSubmit}>
										LOGIN
									</button>
								</form>
								<div className="sign-up-linker">
									<h1 className="up-line">
										<Link to="/forgotpassword">
											<span style={{ color: "#44ac67", fontSize: "25px" }}>
												Forget password?
											</span>
										</Link>
									</h1>
								</div>
							</div>
						</div>
						{/*<h1 className="after-signup" id="after-login">
							You have successfully Loged In.
                            </h1>*/}
					</div>
				</section>
				{/*<p className=" text-center">{JSON.stringify(values)}</p>*/}
				{redirectto()}
			</Base>
		</div>
	);
};
export default Signin;
