import React, { Component } from "react";
import { Sidebar, SidebarItem } from "react-rainbow-components";
import dashboard from "../../assets/icons/dashboard.svg";
import charts from "../../assets/icons/charts.svg";
import "./styles.css";
import { navigateTo } from "../../history";
import Routes from "../../routes";

const verticalNavigationContainerStyles = {
  width: "88px",
  borderBottomLeftRadius: "0.875rem",
  borderRight: "1px solid #e3e5ed"
};

export default class SidebarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: "Dashboard"
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
        <div
          className="react-rainbow-admin-app_sidebar-container"
          id="sidebarContainer"
        >
          <Sidebar
            className="react-rainbow-admin-app_sidebar"
            selectedItem={selectedItem}
            onSelect={this.handleOnSelect}
            style={verticalNavigationContainerStyles}
          >
            <SidebarItem
              className="react-rainbow-admin-app_sidebar-item"
              icon={<img src={dashboard} alt="dashboard" />}
              name="Dashboard"
              label="Dashboard"
              onClick={() => navigateTo("/dashboard")}
            />
            <SidebarItem
              className="react-rainbow-admin-app_sidebar-item"
              icon={<img src={charts} alt="charts" />}
              name="Charts"
              label="Charts"
              onClick={() => navigateTo("/charts")}
            />
          </Sidebar>
        </div>

        <div className="react-rainbow-admin-app_router-container">
          <div className="mainContainer">
            <Routes />
          </div>
        </div>
      </div>
    );
  }
}