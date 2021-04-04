import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { resetpass } from "../auth/helper";

//import Base from "../core/Base";

export default function Forgotpass() {
	let { email, token } = useParams();
	console.log(token)
	const [values, setValues] = useState({
		password: "",
		error: "",
	});
	const { password, error } = values;
	//console.log(email.concat(token));
	const handleChange = (field) => (event) => {
		setValues({ ...values, error: false, [field]: event.target.value });
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
	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false });
		resetpass(email, token, password)
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error });
				} else {
					setValues({
						...values,
						error: (
							<Link to="/login">Password Updated,Click here to Login</Link>
						),
					});
				}
			})
			.catch();
	};
	return (
		<div className="row">
			<div className="col-md-6 offset-sm-3 text-left">
				<p className="text-center">Link to resetPassword</p>
				{errormessage()}
				<form>
					<div className="form-group">
						<label>Email</label>
						<input
							value={email}
							readOnly
							className="form-control"
							type="email"
						/>
					</div>

					<div className="form-group">
						<label>Password</label>
						<input
							className="form-control"
							type="password"
							value={password}
							onChange={handleChange("password")}
						/>
					</div>
					<button className="btn btn-success btn-block" onClick={onSubmit}>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
