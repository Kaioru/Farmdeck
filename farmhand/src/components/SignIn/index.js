import React, { Component } from "react";
import { Input, Card, Button } from "react-rainbow-components";
import "./styles.css";

import { Link } from "react-router-dom";

const INITIAL_STATE = {
  username: "",
  password: "",
  error: null
};

const SignInPage = () => (
  <div className="rainbow-p-around_medium">
    <SignInForm />
  </div>
);

const inputStyles = {
  width: 500
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    event.preventDefault();
  };

  onChange = event => {
    this.setState = { [event.target.name]: event.target.value };
  };

  onReset = () => {
    this.setState = { ...INITIAL_STATE };
  };

  render() {
    const { username, password, error } = this.state;
    return (
      <Card className="signInCard" footer={<SignUpLink />}>
        <div className="rainbow-align-content_center rainbow-flex_wrap">
          <p className="signInCardTitle">Sign In</p>

          <form id="signInForm" onSubmit={this.onSubmit}>
            <div className="rainbow-align-content_center rainbow-flex_wrap">
              <Input
                name="username"
                error={error}
                label="Username"
                placeholder="Username"
                type="username"
                value={username}
                onChange={this.onChange}
                className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                style={inputStyles}
              />
              <Input
                name="password"
                error={error}
                label="Password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={this.onChange}
                className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                style={inputStyles}
              />
            </div>
            <div className="rainbow-align-content_center rainbow-flex_wrap">
              <Button
                label="Submit"
                variant="neutral"
                form="signInForm"
                type="submit"
                className="rainbow-m-vertical_x-large rainbow-m-horizontal_medium rainbow-m_auto"
              />
              <Button
                label="Reset"
                variant="base"
                form="signInForm"
                onClick={this.onReset}
                type="button"
                className="rainbow-m-vertical_x-large rainbow-m-horizontal_medium rainbow-m_auto"
              />
            </div>
          </form>
        </div>
      </Card>
    );
  }
}

const SignInForm = SignInFormBase;

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={"/signup"}>Sign Up!</Link>
  </p>
);
export default SignInPage;
export { SignInForm, SignUpLink };
