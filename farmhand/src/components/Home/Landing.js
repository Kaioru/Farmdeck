import React, { Component } from 'react';
import axios from 'axios';
import Deck from './Deck';
import './styles.css';
import SidebarContainer from '../SidebarContainer';
import { Spinner } from 'react-rainbow-components';
const INITIAL_STATE = { isLoading: true, onSelect: false, selectedId: '' };

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  getdeck = async () => {
    await this.props.getdeck();
    this.setState({ isLoading: false });
  };

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
      const response = await axios.delete('http://kaioru.ngrok.io/decks/' + id, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });

      if (response.status === 200) {
        alert('Deleted!');
        this.setState({ deckList: this.props.getdeck() });
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  render() {
    const { onSelect, selectedId, isLoading } = this.state;
    const { decklist } = this.props;
    let deletedeck = this.deletedeck;
    let onClick = this.onClick;
    if (onSelect) {
      return <SidebarContainer id={selectedId} token={this.props.token} />;
    } else if (decklist.length > 0) {
      return (
        <div className="container">
          <div class="deckList">
            {decklist.map(function(item, i) {
              return <Deck title={item['name']} id={item['id']} deletedeck={deletedeck} onClick={onClick} />;
            })}
          </div>
        </div>
      );
    } else {
      if (isLoading) {
        return (
          <div className="container">
            <Spinner size="large" />
          </div>
        );
      } else {
        return (
          <div className="container">
            <h1>There's currently no decks, add one!</h1>
          </div>
        );
      }
    }
  }
}
