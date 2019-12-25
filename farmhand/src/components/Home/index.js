import React from "react";
import SidebarContainer from "../SidebarContainer";
import { Card } from "react-rainbow-components";
import Deck from "./Deck";
import "./styles.css";

function Home(props) {
  const { auth, token } = props;
  if (auth) {
    return (
      <div>
        <SidebarContainer token={token} />
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1>You're not signed in!</h1>
      </div>
    );
  }
}

export default Home;
