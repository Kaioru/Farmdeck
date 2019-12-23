import React from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import SignUpPage from "./components/SignUp";
import Home from "./components/Home";
import SectionHeading from "./components/SectionHeading";
import SignInPage from "./components/SignIn";

const Routes = ({ auth, authSwitch, login, submitting }) => {
  return (
    <Router history={history}>
      <SectionHeading auth={auth} />
      <Route path="/home" render={() => <Home auth={auth} />} />

      <Route path="/signup" render={() => <SignUpPage />} />
      <Route
        path="/signin"
        render={() => (
          <SignInPage
            auth={auth}
            authSwitch={authSwitch}
            login={login}
            submitting={submitting}
          />
        )}
      />
    </Router>
  );
};

export default Routes;
