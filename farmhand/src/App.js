import React, { Component } from "react";
import "./styles.css";
import Routes from "./routes";
import axios from "axios";
import https from "https";
import { navigateTo } from "./history";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      submitting: false,
      token: ""
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout = () => {
    this.setState({
      token: "",
      auth: false
    });
    navigateTo("/signin");
  };

  login = async (name, pass) => {
    this.setState({
      submitting: true
    });
    let response;
    try {
      response = await axios.post(
        "http://localhost:5000/auth/login",
        {
          username: name,
          password: pass
        },
        { httpsAgent: new https.Agent({ rejectUnauthorized: false }) }
      );
      if (response.status === 200) {
        navigateTo("/home");
        this.setState({
          auth: true,
          submitting: false,
          token: response.data.token
        });
      } else {
        console.log("Error connecting to server");
        this.setState({
          submitting: false
        });
      }
      return response;
    } catch (err) {
      this.setState({
        submitting: false
      });
      response = err.response;
      return err.response;
    }
  };

  render() {
    const props = {
      auth: this.state.auth,
      submitting: this.state.submitting,
      token: this.state.token,
      login: this.login,
      logout: this.logout
    };
    return (
      <div>
        <Routes {...props} />
      </div>
    );
  }
}

export default App;
