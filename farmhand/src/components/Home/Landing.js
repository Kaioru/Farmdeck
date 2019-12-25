import React, { Component } from "react";

const INITIAL_STATE = { deckList: [] };

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
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
}
