import React, { Component } from "react";
import { Sidebar, SidebarItem } from "react-rainbow-components";
import dashboard from "../../assets/icons/dashboard.svg";
import charts from "../../assets/icons/charts.svg";
import "./styles.css";
import { navigateTo } from "../../history";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../Dashboard";
import Charts from "../Charts";
import axios from "axios";

const verticalNavigationContainerStyles = {
  width: "88px",
  borderBottomLeftRadius: "0.875rem",
  borderRight: "1px solid #e3e5ed"
};

export default class SidebarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: "Dashboard",
      deckList: []
    };
    this.handleOnSelect = this.handleOnSelect.bind(this);
  }

  componentDidMount() {
    this.getdeck();
  }

  getdeck = async () => {
    const { token } = this.props;
    console.log(token);
    try {
      const response = await axios.get("http://localhost:5000/decks", {
        headers: { Authorization: "Bearer " + token }
      });
      if (response.status === 200) {
        this.setState({ deckList: response.data });
      }
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

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
              onClick={() => navigateTo("/home/dashboard")}
            />
            <SidebarItem
              className="react-rainbow-admin-app_sidebar-item"
              icon={<img src={charts} alt="charts" />}
              name="Charts"
              label="Charts"
              onClick={() => navigateTo("/home/charts")}
            />
          </Sidebar>
        </div>

        <div className="react-rainbow-admin-app_router-container">
          <div className="mainContainer">
            <Switch>
              <Redirect from="/home" exact to="/home/dashboard" />
              <Route path="/home/charts" component={Charts} />
              <Route path="/home/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
