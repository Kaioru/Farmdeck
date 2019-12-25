import React from "react";
import SidebarContainer from "../SidebarContainer";
import { Card } from "react-rainbow-components";
import Deck from "./Deck";
import "./styles.css";
import Landing from "./Landing";

function Home(props) {
  const { auth, token } = props;
  if (!auth) {
    return <Landing token={token} />;
  } else {
    return (
      <div className="container">
        <h1>You're not signed in!</h1>
      </div>
    );
  }
}

export default Home;
