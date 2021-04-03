import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Search_timetable from "./core/Home";
import Forgotpass from "./user/forgotpass";
import Sendmail from "./user/sendmail";
import Signin from "./user/Signin";
import StudentDashBoard from "./user/StudentDashBoard";
import TeacherDashBoard from "./user/TeacherDashBoard";

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Search_timetable} />
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
				<Route path="/:email/:token" exact component={Forgotpass}></Route>
				<Route path="/forgotpassword" exact component={Sendmail}></Route>
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
