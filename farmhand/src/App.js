import React, { Component } from "react";
import SidebarContainer from './components/SidebarContainer'
import { Card, Column } from "react-rainbow-components";

import logo from './assets/farmicon.jpg'
import "./styles.css"




function App() {
    return (
      <div id="container">
        <div id="headerContainer">
        <header className="react-rainbow-admin_header rainbow-position_fixed rainbow-flex rainbow-align_center rainbow-p-horizontal_large rainbow-background-color_white">
          <img src={logo} alt="rainbow logo" className="rainbow-m-left_medium react-rainbow-global-header-logo" />
                
            </header>
        </div>
        <div>
        <SidebarContainer/>
        </div>
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
