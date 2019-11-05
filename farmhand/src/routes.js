import React from "react";
import { Router, Switch, Redirect, Route } from "react-router-dom";

import history from "./history";
import Dashboard from "./components/Dashboard";
import Charts from "./components/Charts";

export default function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Redirect from="/" exact to="/dashboard" />
        <Route path="/charts" component={Charts} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}
