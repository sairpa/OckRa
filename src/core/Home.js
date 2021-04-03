import React, { useState } from "react";
//import "../styles.css";
import { API } from "../backend";
import hom from "../img/home.jpg";
import Base from "./Base";
import Carousel from "react-bootstrap/Carousel";
import { teachertimetable, sectiontimetable } from "../auth/helper";
import "jspdf-autotable";
import jsPDF from "jspdf";

const Search_timetable = () => {
	const [values, setValues] = useState({
		name: "",
		sec: "",
		batch: "",
		success: false,
		error: "",
		tt: "",
	});

	const { name, batch, sec, success, error, tt } = values;
	const handleChange = (field) => (event) => {
		setValues({ ...values, error: false, [field]: event.target.value });
	};

	const onSubmit = (event) => {
		//console.log("summa");
		event.preventDefault();
		setValues({ ...values, error: false });
		teachertimetable({ name })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, success: false });
				} else {
					setValues({
						...values,
						name: "",
						success: true,
						tt: data.timetable,
					});
				}
			})
			.catch();
	};

	const onSubmit1 = (event) => {
		//console.log("summa");
		event.preventDefault();
		setValues({ ...values, error: false });
		sectiontimetable({ sec, batch })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, success: false });
				} else {
					setValues({
						...values,
						sec: "",
						batch: "",
						success: true,
						tt: data.timetable,
					});
				}
			})
			.catch();
	};

	const successMessage = () => {
		return (
			<div className="row">
				<div className="row px-5">
					<div
						className="alert alert-success"
						style={{ display: success ? "" : "none" }}
					>
						TimeTable retrieved successfully.please{" "}
						<div>
							<button onClick={generatePdf} type="primary">
								Download PDF here
							</button>
						</div>{" "}
					</div>
				</div>
			</div>
		);
	};

	const generatePdf = () => {
		const tableColumn = [
			"day",
			"first period",
			"Second peroid",
			"third peroid",
			"fourth peroid",
			"fifth peroid",
			"sixth peroid",
		];
		const tableRows = [];
		var doc = new jsPDF("p", "pt");
		var i;
		for (i in tt) {
			const timetable = [
				i,
				tt[i][0],
				tt[i][1],
				tt[i][2],
				tt[i][3],
				tt[i][4],
				tt[i][5],
			];
			tableRows.push(timetable);
		}
		doc.autoTable(tableColumn, tableRows, { startY: 20 });
		doc.save("Test.pdf");
		/*var doc = new jsPDF('p', 'pt');
 
    doc.text(20, 20, 'This is the first page title.')
 
   
    doc.text(20, 60, 'This is the content area.')
    doc.addPage() // this code creates new page in pdf document
    
    doc.text(20, 100, 'This is the second page.')
 
 
    doc.save('sample-file.pdf')*/
	};

	const errorMessage = () => {
		return (
			<div className="row">
				<div className="row px-5">
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
		<Base title="Home Page">
			<div className="hr"></div>
			<section className="hr">
				<div className="container">
					<div>
						{successMessage()},{errorMessage()}
					</div>
					<div className="hero">
						<div className="hero-content">
							<Carousel interval={null} controls={false} slide={false}>
								<Carousel.Item style={{ height: "300px", width: "600px" }}>
									<div className="row px-5">
										<label className="sec-txt" style={{ color: "#000" }}>
											Teacher Name
										</label>
										<input
											className="form-control searching"
											id="usr_name"
											name="name"
											type="text"
											required
											onChange={handleChange("name")}
											value={name}
										></input>
									</div>
									<div className="row" style={{ padding: 15 }}>
										<button
											onClick={onSubmit}
											className="btn btn-primary ml-auto"
											type="submit"
										>
											Send
										</button>
									</div>
								</Carousel.Item>

								<Carousel.Item style={{ height: "300px", width: "600px" }}>
									<div className="row px-5">
										<label className="sec-txt" style={{ color: "#000" }}>
											Batch
										</label>
										<input
											className="form-control searching"
											id="batch_name"
											name="batch_name"
											type="text"
											required
											onChange={handleChange("batch")}
											value={batch}
										></input>
									</div>
									<div className="row px-5">
										<label className="sec-txt" style={{ color: "#000" }}>
											Section
										</label>
										<input
											className="form-control searching"
											id="section"
											name="sname"
											type="text"
											required
											onChange={handleChange("sec")}
											value={sec}
										></input>
									</div>
									<div className="row" style={{ padding: 15 }}>
										<button
											onClick={onSubmit1}
											className="btn btn-primary ml-auto"
											type="submit"
										>
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
};

export default Search_timetable;
