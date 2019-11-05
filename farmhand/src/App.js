import React, { Component } from "react";
import SidebarContainer from "./components/SidebarContainer";
import { Card, Column } from "react-rainbow-components";

import "./styles.css";

function App() {
  return (
    <div id="container">
      <SidebarContainer />
      <Card>
        <img
          src="images/illustrations/Illustration-rainbow-1.svg"
          className="rainbow-p-around_xx-large rainbow-m_auto rainbow-align-content_center"
          alt="landscape with rainbows, birds and colorful balloons"
        />
      </Card>
    </div>
  );
}

export default App;
