import React,{useState} from "react";
//import "../styles.css";
import { API } from "../backend";
import hom from "../img/home.jpg";
import Base from "./Base";
import Carousel from "react-bootstrap/Carousel";
import { teachertimetable,sectiontimetable } from "../auth/helper";
import "jspdf-autotable";
import jsPDF from 'jspdf'


	const Search_timetable = () => {
		const [values, setValues] = useState({
			name: "",
			sec: "",
			batch: "",
			success: false,
			error:"",
      tt:""
		});
	
	const {name,batch,sec,success,error,tt}=values
	const handleChange = (field) => (event) => {
		setValues({ ...values, error: false, [field]: event.target.value });
	};

	const onSubmit = event => {
		console.log("summa")
		event.preventDefault();
		setValues({ ...values, error: false });
		teachertimetable({name})
		  .then(data => {
			if (data.error) {
			  setValues({ ...values, error: data.error, success: false });
			} else {
			  setValues({
				...values,
				name: "",
				success: true,
        tt:data
			  });
			}
		  })
		  .catch(console.log("Error in signup"));
	  };

	  const onSubmit1 = event => {
		console.log("summa")
		event.preventDefault();
		setValues({ ...values, error: false });
		sectiontimetable({sec,batch})
		  .then(data => {
			if (data.error) {
			  setValues({ ...values, error: data.error, success: false });
			} else {
			  setValues({
				...values,
				sec:"",
				batch:"",
				success: true,
        tt:data
			  });
			  console.log(tt)
			}
		  })
		  .catch(console.log("Error in signup"));
	  };  
	
	  
	 const successMessage=()=>{
        return(
        <div className="row">
            <div className="row px-5">
        <div className="alert alert-success"
        style={{display:success?"":"none"}}>
            TimeTable retrieved successfully.please <div>
        <button onClick={generatePdf} type="primary">Download PDF</button>
      </div> here
        </div>
        </div>
        </div>)
   }


   const generatePdf = () => {   
  if(tt.role==0){
  const tableColumn = ["day","first period-roomno","second peroid-roomno","third peroid-roomno","fourth peroid-roomno","fifth peroid-roomno","sixth peroid-roomno"]
  const tableRows = [];
  var doc = new jsPDF('l','pt');
  var i
  const t=tt.day
  console.log("hai")
  console.log(t["monday"].timetable[0])
  Object.keys(t).forEach(key => {
	console.log(key);
  })
  Object.keys(t).forEach(key => {
	const timetable=[
		key,
		t[key].timetable[0].concat("-",t[key].roomno[0]),
		t[key].timetable[1].concat("-",t[key].roomno[1]),
		t[key].timetable[2].concat("-",t[key].roomno[2]),
		t[key].timetable[3].concat("-",t[key].roomno[3]),
		t[key].timetable[3].concat("-",t[key].roomno[4]),
		t[key].timetable[5].concat("-",t[key].roomno[5]),
	  ]
	  tableRows.push(timetable)
	console.log(key, t[key].timetable[0]);
  })

doc.autoTable({head:[tableColumn], body:tableRows, startY:20 });
doc.save('Test.pdf');
}
if(tt.role==1){
	const tableColumn = ["day","first period-roomno-sec","second peroid-roomno-sec","third peroid-roomno-sec","fourth peroid-roomno-sec","fifth peroid-roomno-sec","sixth peroid-roomno-sec"]
	const tableRows = [];
	var doc = new jsPDF('l','pt');
	var i
	const t=tt.day
	console.log("hai")
	console.log(t["monday"].timetable[0])
	Object.keys(t).forEach(key => {
	  console.log(key);
	})
	Object.keys(t).forEach(key => {
	  const timetable=[
		  key,
		  t[key].timetable[0].concat("-",t[key].roomno[0],"-",t[key].section[0]),
		  t[key].timetable[1].concat("-",t[key].roomno[1],"-",t[key].section[0]),
		  t[key].timetable[2].concat("-",t[key].roomno[2],"-",t[key].section[0]),
		  t[key].timetable[3].concat("-",t[key].roomno[3],"-",t[key].section[0]),
		  t[key].timetable[3].concat("-",t[key].roomno[4],"-",t[key].section[0]),
		  t[key].timetable[5].concat("-",t[key].roomno[5],"-",t[key].section[0]),
		]
		tableRows.push(timetable)
	  console.log(key, t[key].timetable[0]);
	})
  
  doc.autoTable({head:[tableColumn], body:tableRows, startY:20 });
  doc.save('Test.pdf');	
}
  }

	const errorMessage=()=>{
        return(
        <div className="row">
            <div className="row px-5">        
		<div className="alert alert-danger"
        style={{display:error?"":"none"}}>
          {error}  
        </div>
        </div>
        </div>)
    }


	return (
		<Base title="Home Page">
			<div className="hr"></div>
			<section className="hr">
				<div className="container">
          <div>
            {successMessage()},
            {errorMessage()}
          </div>
					<div className="hero">
						<div className="hero-content">
							<Carousel interval={null} controls={false} slide={false} >
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
											onChange={handleChange("name")}
											value={name}
										></input>
										
									</div>
									<div className="row" style={{ padding: 15 }}>
										<button onClick={onSubmit} className="btn btn-primary ml-auto" type="submit">
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
											onChange={handleChange("batch")}
											value={batch}
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
											onChange={handleChange("sec")}
											value={sec}
										></input>
									</div>
									<div className="row" style={{ padding: 15 }}>
										<button onClick={onSubmit1} className="btn btn-primary ml-auto" type="submit">
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


export default Search_timetable