import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/helper/PrivateRoute";
import Home from "./core/Home";
import Feedback from "./user/Feedback";
import Forgotpass from "./user/forgotpass";
import Profile from "./user/Profile";
import Sendmail from "./user/sendmail";
import Signin from "./user/Signin";
import StudentDashBoard from "./user/StudentDashBoard";

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/login" exact component={Signin}></Route>
				<PrivateRoute
					path="/studentdashboard"
					exact
					component={StudentDashBoard}
				></PrivateRoute>
				<PrivateRoute
					path="/teacherdashboard"
					exact
					component={StudentDashBoard}
				></PrivateRoute>
				<PrivateRoute
					path="/feedback"
					exact
					component={Feedback}
				></PrivateRoute>
				<PrivateRoute path="/profile" exact component={Profile}></PrivateRoute>
				<Route path="/:email/:token" exact component={Forgotpass}></Route>
				<Route path="/forgotpassword" exact component={Sendmail}></Route>
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
