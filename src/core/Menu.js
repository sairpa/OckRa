import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";
import icla from "../img/ic_launcher.png";
import icla1 from "../img/ic_launcher1.png";

const Menu = ({ history }) => (
	<div className="container-fluid">
		<nav className="nav">
			{isAuthenticated() && isAuthenticated().user.role === 0 && (
				<div className="navbar-brand">
					<img
						src={icla}
						width="30"
						height="30"
						className="d-inline-block align-top"
						alt=""
					/>
					Student Account
				</div>
			)}
			{isAuthenticated() && isAuthenticated().user.role === 1 && (
				<div className="navbar-brand">
					<img
						src={icla1}
						width="30"
						height="30"
						className="d-inline-block align-top"
						alt=""
					/>
					Teacher Account
				</div>
			)}
			<ul className="nav-list ml-auto">
				<Link to="/" className="px-5" style={{ color: "#000000" }}>
					Home
				</Link>
				{!isAuthenticated() && (
					<Link className="cmn-btn px-4" to="/login">
						Login
					</Link>
				)}

{isAuthenticated() &&
					(isAuthenticated().user.role === 0 ||
						isAuthenticated().user.role === 1) && (
						<Fragment>
							{isAuthenticated().user.role === 0 && (
								<Link
									to="/studentdashboard"
									className="px-4"
									style={{ color: "#000000" }}
								>
									Dashboard
								</Link>
							)}
							{isAuthenticated().user.role === 1 && (
								<Link
									to="/teacherdashboard"
									className="px-4"
									style={{ color: "#000000" }}
								>
									Dashboard
								</Link>
							)}
							<Link
								className="cmn-btn px-4"
								onClick={() => {
									signout(() => {
										localStorage.removeItem("details");
									});
								}}
								to="/login"
							>
								Signout
							</Link>
						</Fragment>
					)}
				
			</ul>
		</nav>
	</div>
);

export default withRouter(Menu);
