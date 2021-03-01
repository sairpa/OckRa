import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css'
import Carousel from 'react-bootstrap/Carousel'

export default class Home_Page extends Component{
    constructor(props) {
        super(props);
        this.support_ref=React.createRef();
        this.foc = this.foc.bind(this);
    }
    foc(){
        this.support_ref.current.focus();

    }
    render(){
        return(
        <div>
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg navbar-fixed-top noPadding">
                    <Link to="/" className="navbar-brand">Occupancy chart generation</Link>
                    <div className="collpase navbar-collapse">
                    <ul className="nav navbar-nav ml-auto">
                        <li className="navbar-item">
                        <Link to="/login" className="nav-link" title="Login">Login</Link>
                        </li>
                        <li className="navbar-item">
                        <a href="#support" className="nav-link" title="Add comments">Support</a>
                        </li>
                        <li className="navbar-item">
                        <Link to="#contact" className="nav-link" title="Contact details">Contact</Link>
                        </li>
                    </ul>
                    </div>
                    </nav>
            <div className="row pa bg2">

                <div className="col-sm-4" >
                        
                </div>
                
                <Carousel interval={null} controls={false} slide={false} >
                <Carousel.Item className="pa"  style={{'height':"300px",'width':"600px"}}>
                
                   
                    <div className="row">
                        <label for="teach_name" style={{color:'#fff'}}>Teacher Name</label>
                        <input className="form-control" id="usr_name" name="name"  type="text" required ></input>
                    </div>
                    <div className="row" style={{padding: 15}}>
                        <button className="btn btn-primary ml-auto" type="submit" > Send </button>
                    </div>

                
                </Carousel.Item>

                <Carousel.Item className="pa"  style={{'height':"300px",'width':"600px"}}>
                <div className="row">
                        <label for="batch_name" style={{color:'#fff'}} >Batch</label>
                        <input className="form-control" id="batch_name" name="batch_name"  type="text" required ></input>
                    </div>
                    <div className="row">
                        <label for="section" style={{color:'#fff'}} >Section</label>
                        <input className="form-control" id="section" name="sname"  type="text" required ></input>
                    </div>                       
                    <div className="row" style={{padding: 15}}>
                        <button className="btn btn-primary ml-auto" type="submit" > Send </button>
                    </div>
                </Carousel.Item>
                
                
                </Carousel>
                <br/>

            </div>
           
            <div className="container-fluid pa sup" >
                <h2 className="text-center" >Comments</h2>
                <div className="row" id="support" >
                    
                    <div className="col-sm-7">
                        <div className="row">

                            <div className="col-sm-6">
                                <label for="name" ><h6>Name</h6></label>
                                <input className="form-control bg3" id="usr_name" ref={this.support_ref} name="name"  type="text" required></input>
                                <br/>
                                
                            </div>
                            <div className="col-sm-6">
                                <label for="email"><h6>Email</h6></label>
                                <input className="form-control bg3" id="usr_email" name="email"  type="email" required></input>
                                <br/>
                            </div>

                        </div>
                        <label for="comments" ><h6>Add comments</h6></label>
                        <textarea className="form-control bg3" id="comments" name="comments"  rows="5"></textarea><br/>
                        <button className="btn btn-primary ml-auto" type="submit" > Send </button>
                        <br/>
                        <br/>

                    </div>
                    <div className="col-sm-5">
                        <br/>
                        <br/>
                        <p >Enter your comments or the bugs present in the application.<br/>Thanks for your support</p>

                    </div>

                </div>

            </div>
            
        </div>
      
        
            
        )
    }

}