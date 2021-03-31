import React from "react";
//import "../styles.css";
import { API } from "../backend";
import hom from "../img/home.jpg";
import Base from "./Base";
import Carousel from "react-bootstrap/Carousel";

export default function Home() {
	console.log("API IS", API);

	return (
		<Base title="Home Page">
			<div className="hr"></div>
			<section className="hr">
				<div className="container">
					<div className="hero">
						<div className="hero-content">
							<Carousel interval={null} controls={false} slide={false}>
								<Carousel.Item style={{ height: "300px", width: "600px" }}>
									<div className="row px-5">
										<label
											className="sec-txt"
											for="teach_name"
											style={{ color: "#000" }}
										>
											Teacher Name
										</label>
										<input
											className="form-control searching"
											id="usr_name"
											name="name"
											type="text"
											required
										></input>
									</div>
									<div className="row" style={{ padding: 15 }}>
										<button className="btn btn-primary ml-auto" type="submit">
											Send
										</button>
									</div>
								</Carousel.Item>

								<Carousel.Item style={{ height: "300px", width: "600px" }}>
									<div className="row px-5">
										<label
											className="sec-txt"
											for="batch_name"
											style={{ color: "#000" }}
										>
											Batch
										</label>
										<input
											className="form-control searching"
											id="batch_name"
											name="batch_name"
											type="text"
											required
										></input>
									</div>
									<div className="row px-5">
										<label
											className="sec-txt"
											for="section"
											style={{ color: "#000" }}
										>
											Section
										</label>
										<input
											className="form-control searching"
											id="section"
											name="sname"
											type="text"
											required
										></input>
									</div>
									<div className="row" style={{ padding: 15 }}>
										<button className="btn btn-primary ml-auto" type="submit">
											Send
										</button>
									</div>
								</Carousel.Item>
							</Carousel>
						</div>
						<img className="home" src={hom} alt="" />
					</div>
				</div>
			</section>
		</Base>
	);
}
