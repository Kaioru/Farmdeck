import React, { Component } from "react";
import "./styles.css";
import Routes from "./routes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    };
  }

  authSwitch = () => {
    this.setState(state => ({ auth: !state.auth }));
  };

  render() {
    console.log(this.state.auth);
    return (
      <div>
        <Routes authSwitch={() => this.authSwitch()} auth={this.state.auth} />
      </div>
    );
  }
}

export default App;
