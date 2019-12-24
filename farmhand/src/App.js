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
      auth: true,
      submitting: false,
      token: ""
    };
    this.authSwitch = this.authSwitch.bind(this);
    this.login = this.login.bind(this);
  }

  authSwitch = () => {
    this.setState(state => ({ auth: !state.auth }));
  };

  login = async (name, pass) => {
    this.setState({
      submitting: true
    });
    try {
      const response = await axios.post(
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
    } catch (err) {
      return false;
    }
  };

  render() {
    const props = {
      authSwitch: this.authSwitch,
      auth: this.state.auth,
      submitting: this.state.submitting,
      token: this.state.token,
      login: this.login
    };
    return (
      <div>
        <Routes {...props} />
      </div>
    );
  }
}

export default App;
