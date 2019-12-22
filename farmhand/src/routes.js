import React from "react";
import { Router, Switch, Redirect, Route } from "react-router-dom";

import history from "./history";
import Dashboard from "./components/Dashboard";
import Charts from "./components/Charts";
import SignUpPage from "./components/SignUp";
import Home from "./components/Home";
import SectionHeading from "./components/SectionHeading";
import SignInPage from "./components/SignIn";

const Routes = () => (
  <Router history={history}>
    <SectionHeading />
    <Route path="/home" component={Home} />
    <Route path="/signup" component={SignUpPage} />
    <Route path="/signin" component={SignInPage} />
  </Router>
);

export default Routes;
