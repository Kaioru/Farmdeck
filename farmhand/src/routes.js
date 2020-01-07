import React from "react";
import { Router, Route, Redirect } from "react-router-dom";
import history from "./history";
import SignUpPage from "./components/SignUp";
import Home from "./components/Home";
import SectionHeading from "./components/SectionHeading";
import SignInPage from "./components/SignIn";

const Routes = ({
  auth,
  login,
  logout,
  submitting,
  token,
  username,
  getdeck,
  decklist
}) => {
  return (
    <Router history={history}>
      <Redirect from="/" exact to="/home" />
      <SectionHeading
        auth={auth}
        token={token}
        logout={logout}
        username={username}
        getdeck={getdeck}
      />
      <Route
        path="/home"
        render={() => (
          <Home
            auth={auth}
            token={token}
            decklist={decklist}
            getdeck={getdeck}
          />
        )}
      />

      <Route path="/signup" render={() => <SignUpPage />} />
      <Route
        path="/signin"
        render={() => (
          <SignInPage auth={auth} login={login} submitting={submitting} />
        )}
      />
    </Router>
  );
};

export default Routes;
