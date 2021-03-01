import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import Home_Page from "./components/homepage.component"
import Login from "./components/Login.component"

function App() {
  return (
    <Router>
      
      <Route path="/" exact component={Home_Page} />
      <Route path="/login"  component={Login} />


    </Router>
  );
}

export default App;
