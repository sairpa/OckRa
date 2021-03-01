import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css'

export default class Navbar extends Component{
    render(){
      return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg noPadding">
          <Link to="/" className="navbar-brand">Occupancy chart generation</Link>
          <div className="collpase navbar-collapse">
          <ul className="nav navbar-nav ml-auto">
            <li className="navbar-item">
            <Link to="/login" className="nav-link" title="Login">Login</Link>
            </li>
            <li className="navbar-item">
            <Link to="/#support" className="nav-link" title="Add comments">Support</Link>
            </li>
            <li className="navbar-item">
            <Link to="#contact" className="nav-link" title="Contact details">Contact</Link>
            </li>
          </ul>
          </div>
        </nav>
      );
    }
}