import React, { useState } from "react";
import { forgotpassword } from "../auth/helper";


export default function Sendmail() {
	const [values, setValues] = useState({
		email: "",
		error: "",
	});
	const { email, error } = values;
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
		forgotpassword(email)
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error });
				} else {
					setValues({
						...values,
						error: "Mail Succesfully sent to your account",
					});
				}
			})
			.catch();
	};

	return (
		<div className="row">
			<div className="col-md-6 offset-sm-3 text-left">
				<p className="text-center">Enter Email to get reset the password</p>
				{errormessage()}
				<form>
					<div className="form-group">
						<label>Email</label>
						<input
							value={email}
							onChange={handleChange("email")}
							className="form-control"
							type="email"
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
