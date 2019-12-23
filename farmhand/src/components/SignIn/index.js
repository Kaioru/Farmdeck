import React, { Component } from "react";
import { Input, Card, Button } from "react-rainbow-components";
import "./styles.css";

import { Link } from "react-router-dom";

const INITIAL_STATE = {
  username: "",
  password: "",
  errors: {
    username: "",
    password: "",
    isInvalid: true
  }
};

const SignInPage = ({ auth, authSwitch, login, submitting }) => {
  return (
    <div className="rainbow-p-around_medium">
      <SignInForm
        auth={auth}
        authSwitch={authSwitch}
        login={login}
        submitting={submitting}
      />
    </div>
  );
};

const inputStyles = {
  width: 500
};

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  throwValidationError = () => {
    const { username, password, errors } = this.state;
    errors.username =
      username.length > 3 ? "" : "Username must be at least 4 characters long!";
    errors.password =
      password.length > 4 ? "" : "Password must be at least 5 characters long!";
    this.setState({ errors });
    console.log(errors);
    return true;
  };
  onSubmit = event => {
    const { username, password, errors } = this.state;
    !errors.isInvalid
      ? this.props.login(username, password)
      : this.throwValidationError();
    event.preventDefault();
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onReset = () => {
    this.setState = { ...INITIAL_STATE };
  };

  render() {
    const { username, password, errors } = this.state;

    errors.isInvalid =
      password === "" || password.length < 6 || username.length < 4;
    return (
      <Card className="signInCard" footer={<SignUpLink />}>
        <div className="rainbow-align-content_center rainbow-flex_wrap">
          <p className="signInCardTitle">Sign In</p>
          <form id="signInForm" onSubmit={this.onSubmit}>
            <div className="rainbow-align-content_center rainbow-flex_wrap">
              <Input
                name="username"
                error={errors["username"]}
                label="Username"
                placeholder="Username"
                type="text"
                value={username}
                onChange={this.onChange}
                className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                style={inputStyles}
              />
              <Input
                name="password"
                error={errors["password"]}
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
                isLoading={this.props.submitting}
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

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={"/signup"}>Sign Up!</Link>
  </p>
);
export default SignInPage;
export { SignInForm, SignUpLink };
