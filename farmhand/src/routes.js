import React from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import SignUpPage from "./components/SignUp";
import Home from "./components/Home";
import SectionHeading from "./components/SectionHeading";
import SignInPage from "./components/SignIn";

const Routes = ({ auth, authSwitch }) => {
  return (
    <Router history={history}>
      <SectionHeading />
      <Route path="/signup" render={() => <SignUpPage auth={auth} />} />
      <Route
        path="/home"
        render={() => <Home auth={auth} authSwitch={authSwitch} />}
      />

      <Route
        path="/signin"
        render={() => <SignInPage auth={auth} authSwitch={authSwitch} />}
      />
    </Router>
  );
};

export default Routes;
