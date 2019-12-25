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
    console.log(id);
    return this.setState({
      onSelect: true,
      selectedId: id
    });
  };

  deletedeck = async id => {
    const { token } = this.props;
    try {
      const response = await axios.delete("http://localhost:5000/decks" + id, {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxIiwidW5pcXVlX25hbWUiOiJhc2Rhc2QiLCJuYmYiOjE1NzcyOTA0NzUsImV4cCI6MTU3NzM3Njg3NSwiaWF0IjoxNTc3MjkwNDc1LCJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJsb2NhbGhvc3QifQ.2ksMArcVZRwZsSrhp0-GTfgJ09RE_Q6ScsquNA59aDE"
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
    console.log(token);
    try {
      const response = await axios.get("http://localhost:5000/decks", {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxIiwidW5pcXVlX25hbWUiOiJhc2Rhc2QiLCJuYmYiOjE1NzcyOTA0NzUsImV4cCI6MTU3NzM3Njg3NSwiaWF0IjoxNTc3MjkwNDc1LCJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJsb2NhbGhvc3QifQ.2ksMArcVZRwZsSrhp0-GTfgJ09RE_Q6ScsquNA59aDE"
        }
      });
      if (response.status === 200) {
        this.setState({ deckList: response.data });
      }
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { deckList, onSelect, selectedId } = this.state;
    let deletedeck = this.deletedeck;
    let onClick = this.onClick;
    if (onSelect) {
      return <SidebarContainer id={selectedId} />;
    } else {
      return (
        <div className="container">
          <div class="deckList">
            {deckList.map(function(item, i) {
              console.log(item["name"]);
              return (
                <Deck
                  title={item["name"]}
                  id={item["id"]}
                  deletedeck={() => deletedeck}
                  onClick={() => onClick}
                />
              );
            })}
          </div>
        </div>
      );
    }
  }
}
