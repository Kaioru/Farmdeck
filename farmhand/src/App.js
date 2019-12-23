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
      submitting: false
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
        if (!this.state.auth) {
          this.authSwitch();
        }
        navigateTo("/home");
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

  render() {
    return (
      <div>
        <Routes
          authSwitch={this.authSwitch}
          auth={this.state.auth}
          submitting={this.state.submitting}
          login={this.login}
        />
      </div>
    );
  }
}

export default App;
