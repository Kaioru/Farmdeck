import React, { Component } from "react";
import { Sidebar, SidebarItem } from "react-rainbow-components";
import dashboard from "./assets/icons/dashboard.svg";
import charts from "./assets/icons/charts.svg";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: "GettingStarted"
    };
    this.handleOnSelect = this.handleOnSelect.bind(this);
  }

  handleOnSelect(e, selectedItem) {
    return this.setState({ selectedItem });
  }

  render() {
    const { selectedItem } = this.state;
    return (
      <div id="cardContainer">
        <div id="headerContainer">
          <header className="rainbow-align-content_space-between rainbow-p-vertical_small react-rainbow-golbal-header rainbow-background-color_white">
            <div className="rainbow-flex rainbow-align_center">
              <p>FarmHand</p>
            </div>
          </header>
        </div>
        <header className="rainbow-align-content_space-between rainbow-background-color_white rainbow-p-vertical_medium react-rainbow-golbal-header"></header>
        <div
          className="rainbow-background-color_white rainbow-p-top_small rainbow-p-bottom_medium"
          id="sidebarContainer"
        >
          <Sidebar
            selectedItem={selectedItem}
            onSelect={this.handleOnSelect}
            id="sidebar-1"
          >
            <SidebarItem
              icon={<img src={dashboard} alt="dashboard" />}
              name="Dashboard"
              label="Dashboard"
            />
            <SidebarItem
              icon={<img src={charts} alt="charts" />}
              name="Charts"
              label="Charts"
            />
          </Sidebar>
        </div>
      </div>
    );
  }
}

export default App;
