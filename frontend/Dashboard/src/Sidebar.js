import React, { Component } from 'react';
import './Sidebar.css';
import {Link} from 'react-router-dom';

export default class Sidebar extends Component {
    render() {
        return (
            <nav className="sidebar-nav">
                <ul className="nav-links">
                  <Link to="/"><a>
                    <li><i class="fas fa-home"></i>&nbsp;HOME</li></a>
                  </Link>
                  <Link to="/profile">
                    <li><i class="fas fa-user-circle"></i>&nbsp;PROFILE</li>
                  </Link>
                  <Link to="/feedback">
                    <li><i class="fas fa-comment-dots"></i>&nbsp;FEEDBACK</li>
                  </Link>
                  <Link to="/logout">
                    <li><i class="fas fa-sign-out-alt"></i>&nbsp;LOGOUT</li>
                  </Link>  
                   
                </ul>
            </nav>

        );
    }
}