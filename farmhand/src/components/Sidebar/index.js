import React, {Component} from 'react';
import {Sidebar, SidebarItem} from 'react-rainbow-components';
import dashboard from "../../assets/icons/dashboard.svg";
import charts from "../../assets/icons/charts.svg";

const verticalNavigationContainerStyles = {
    width: '88px',
    borderBottomLeftRadius: '0.875rem',
    borderRight: '1px solid #e3e5ed',
  };

export default class SidebarContainer extends Component{

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

    render(){
        const { selectedItem } = this.state;
        return(
        <div className="rainbow-background-color_white rainbow-p-top_small rainbow-p-bottom_medium" id = "sidebarContainer">
          <Sidebar
            selectedItem={selectedItem}
            onSelect={this.handleOnSelect}
            style={verticalNavigationContainerStyles}
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
        )
    }
}