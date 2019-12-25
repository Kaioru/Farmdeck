import React, { Component } from "react";
import axios from "axios";
import Deck from "./Deck";
import "./styles.css";
import SidebarContainer from "../SidebarContainer";
const INITIAL_STATE = { deckList: [], onSelect: false, selectedId: "" };

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.getdeck();
  }

  onClick = id => {
    return this.setState({
      onSelect: true,
      selectedId: id
    });
  };

  deletedeck = async id => {
    const { token } = this.props;
    try {
      const response = await axios.delete("http://localhost:5000/decks/" + id, {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      if (response.status === 200) {
        alert("Deleted!");
      }
    } catch (err) {
      return err;
    }
  };

  getdeck = async () => {
    const { token } = this.props;
    try {
      const response = await axios.get("http://localhost:5000/decks", {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (response.status === 200) {
        this.setState({ deckList: response.data });
      }
      return response;
    } catch (err) {
      return err;
    }
  };

  render() {
    const { deckList, onSelect, selectedId } = this.state;
    let deletedeck = this.deletedeck;
    let onClick = this.onClick;
    if (onSelect) {
      return <SidebarContainer id={selectedId} token={this.props.token} />;
    } else {
      return (
        <div className="container">
          <div class="deckList">
            {deckList.map(function(item, i) {
              return (
                <Deck
                  title={item["name"]}
                  id={item["id"]}
                  deletedeck={deletedeck}
                  onClick={onClick}
                />
              );
            })}
          </div>
        </div>
      );
    }
  }
}
