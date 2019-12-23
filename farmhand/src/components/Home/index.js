import React from "react";
import SidebarContainer from "../SidebarContainer";

import "./styles.css";

function Home(props) {
  const { auth } = props;

  if (auth) {
    return (
      <div>
        <SidebarContainer />
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Home;
