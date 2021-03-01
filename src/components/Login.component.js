import React, {useRef, Component,useState } from 'react';
import axios from 'axios';
import { Link,useHistory} from 'react-router-dom';
import './App.css'
import { auth } from "../firebase"


//import "bootstrap/dist/css/bootstrap.min.css";
//<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css" rel="stylesheet"></link>

export default class Login extends Component{
    constructor(props){
        super(props);
        var x=document.getElementById('root');
        x.style.backgroundColor="#E6E6FA";
        this.onSubmit = this.onSubmit.bind(this);
        this.onnameChange=this.onnameChange.bind(this);
        this.onpassChange=this.onpassChange.bind(this);
        this.state = {
            username: '',
            password: ''
          }
        
    }
    onnameChange(e){
        this.setState({
            username: e.target.value
          })
        
    }
    onpassChange(e){
        this.setState({
            password:e.target.value
        })
        

    }
    async  onSubmit(e) {
        
        e.preventDefault()
        console.log(this.state.username)
        console.log(this.state.password)
        try{
            
            await auth.signInWithEmailAndPassword(this.state.username, this.state.password)
            console.log("succesful")
            window.location = '/';
        }
        catch {
            console.log("failed")
            
        }
        
    }

    render(){
        return(
            
        <div >
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
            <div className="user_card">
                <h2 className="text-center" style={{marginBottom: '20px'}}>Login</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="input-group">
                    <span className="input-group-addon" style={{color: 'darkkhaki'}}><i className="glyphicon glyphicon-user" /></span>
                    <input id="email" type="email"className="form-control" value={this.state.username} onChange={this.onnameChange} placeholder="Email" />
                    </div>
                    <div className="input-group" style={{marginTop: '20px'}}>
                    <span className="input-group-addon" style={{color: 'darkkhaki'}}><i className="glyphicon glyphicon-lock" /></span>
                    <input id="password" value={this.state.password} type="password" className="form-control" onChange={this.onpassChange}  placeholder="Password" />
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