import React, { Component } from "react";
import { Input, Card, Button } from "react-rainbow-components";
import "./media-queries.css";
import { navigateTo } from "../../history";
import "./styles.css";
import axios from "axios";
import https from "https";

const INITIAL_STATE = {
  username: "",
  password: "",
  confirmPassword: "",
  errors: {
    username: "",
    password: "",
    confirmPassword: "",
    isInvalid: true
  },
  submitting: false
};

const inputStyles = {
  width: 500
};

const SignUpPage = () => (
  <div className="rainbow-p-around_medium">
    <SignUpForm />
  </div>
);

class SignUpFormBase extends Component {
  POST = async (name, pass, confirmPass) => {
    this.setState({
      submitting: true
    });
    try {
      const response = await axios.post(
        "http://localhost:5001/auth/register",
        {
          Username: name,
          Password: pass,
          ConfirmPassword: confirmPass
        },
        { httpsAgent: new https.Agent({ rejectUnauthorized: false }) }
      );
      if (response.status === 200) {
        alert("Signed up!!!");
        this.setState({
          submitting: false
        });
      } else {
        console.log("Error connecting to server");
        this.setState({
          submitting: false
        });
      }
    } catch (err) {
      return false;
    }
  };
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, password, confirmPassword, errors } = this.state;
    let response;
    !errors.isInvalid
      ? this.POST(username, password, confirmPassword)
      : this.throwValidationError();
    event.preventDefault();
  };

  throwValidationError = () => {
    const { username, password, confirmPassword, errors } = this.state;
    errors.username =
      username.length > 3 ? "" : "Username must be at least 4 characters long!";
    errors.password =
      password.length > 4 ? "" : "Password must be at least 5 characters long!";
    errors.confirmPassword =
      password === confirmPassword ? "" : "Passwords don't match";
    this.setState({ errors });
    console.log(errors);
    return true;
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onReset = event => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { username, password, confirmPassword, errors } = this.state;

    // Validations
    errors.isInvalid =
      password !== confirmPassword ||
      password === "" ||
      password.length < 6 ||
      username.length < 4;

    return (
      <Card className="signUpCard" footer={<SignInLink />}>
        <div className="rainbow-align-content_center rainbow-flex_wrap">
          <p className="signUpCardTitle">Sign Up</p>

          <form id="signUpForm" onSubmit={this.onSubmit}>
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
              <Input
                name="confirmPassword"
                error={errors["confirmPassword"]}
                label="Confirm Password"
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={this.onChange}
                className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                style={inputStyles}
              />
            </div>
            <div className="rainbow-align-content_center rainbow-flex_wrap">
              <Button
                label="Submit"
                variant="neutral"
                form="signUpForm"
                type="submit"
                className="rainbow-m-vertical_x-large rainbow-m-horizontal_medium rainbow-m_auto"
              />
              <Button
                label="Reset"
                variant="base"
                form="signUpForm"
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

const SignUpForm = SignUpFormBase;

const SignInLink = () => <p>Already have an account?</p>;

export default SignUpPage;
export { SignUpForm, SignInLink };
