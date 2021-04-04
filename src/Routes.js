import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Home from "./core/Home";
import forgotpass from "./user/forgotpass";
import Signin from "./user/Signin";
import StudentDashBoard from "./user/StudentDashBoard";
import TeacherDashBoard from "./user/TeacherDashBoard"
import Feedback from "./user/Feedback"

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
					component={TeacherDashBoard}
				></PrivateRoute>
				<PrivateRoute
					path="/feedback"
					exact
					component={Feedback}
				></PrivateRoute>
				<Route path="/:email/:token" exact component={forgotpass}></Route>
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
