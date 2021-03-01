import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css'

//import "bootstrap/dist/css/bootstrap.min.css";
//<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css" rel="stylesheet"></link>

export default class Login extends Component{
    constructor(props){
        super(props);
        var x=document.getElementById('root');
        x.style.backgroundColor="#E6E6FA";
    }
    render(){
        return(
            
        <div >
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
            <div className="user_card">
                <h2 className="text-center" style={{marginBottom: '20px'}}>Login</h2>
                <form>
                    <div className="input-group">
                    <span className="input-group-addon" style={{color: 'darkkhaki'}}><i className="glyphicon glyphicon-user" /></span>
                    <input id="email" type="email" className="form-control" name="email" placeholder="Email" />
                    </div>
                    <div className="input-group" style={{marginTop: '20px'}}>
                    <span className="input-group-addon" style={{color: 'darkkhaki'}}><i className="glyphicon glyphicon-lock" /></span>
                    <input id="password" type="password" className="form-control" name="password" placeholder="Password" />
                    </div>
                    <div className="pull-right" style={{marginTop: '20px'}}>
                    <input className="btn btn-primary" type="submit" defaultValue="Login" />
                    </div>
                </form>
                <a href="/retrieve">Forgot password?</a>
            </div>
        </div>
           
           

            
        )
    }
}