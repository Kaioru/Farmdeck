import React from "react";
import "./styles.css";
import Landing from "./Landing";

function Home(props) {
  const { auth, token, decklist, getdeck } = props;
  if (auth) {
    return <Landing token={token} decklist={decklist} getdeck={getdeck} />;
  } else {
    return (
      <div className="container">
        <h1>You're not signed in!</h1>
      </div>
    );
  }
}

export default Home;
