import React, { Component } from "react";
import { GlobalHeader, Sidebar, SidebarItem } from "react-rainbow-components";
import dashboard from "./assets/icons/dashboard.svg";
import charts from "./assets/icons/charts.svg";

export default class App extends Component {
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
      <div>
        <GlobalHeader />
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
    );
  }
}
