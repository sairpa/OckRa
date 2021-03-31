import React from "react";
//import foo from "./foo";
import twitter from "../img/twitter.png";
import facebook from "../img/facebook.png";
import instagram from "../img/instagram.png";
import Menu from "./Menu";

const Base = ({
	title = "My Title",
	description = "My desription",
	className = "bg-dark text-white p-4",
	children,
}) => (
	<div>
		<Menu />
		<div>{children}</div>
		<div className="container-fluid bg-dark ">
			<div className="foot-content col-md-6 offset-sm-8 text-left">
				<div className="foot2">
					<h1 className="foot-heading">Get in touch</h1>
					<div className="line" />
					<div className="split-content">
						<h4>Phone</h4>
						<h4>+91 93434 98959</h4>
					</div>
					<div className="split-content">
						<h4>Email</h4>
						<h4>www.amrita.edu</h4>
					</div>
					{/*<div className="icons">
						<a href="#">
							<img src={twitter} alt="" />
						</a>
						<a href="#">
							<img src={facebook} alt="" />
						</a>
						<a href="#">
							<img src={instagram} alt="" />
						</a>
						<br />
						<div className="line" />
</div>*/}
				</div>
			</div>
		</div>
	</div>
);

export default Base;
