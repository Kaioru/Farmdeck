import React from "react";
import SidebarContainer from "../SidebarContainer";

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
    return <div></div>;
  }
}

export default Home;
