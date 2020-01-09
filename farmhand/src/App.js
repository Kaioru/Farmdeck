import React, { Component } from 'react';
import './styles.css';
import Routes from './routes';
import axios from 'axios';
import https from 'https';
import { navigateTo } from './history';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      submitting: false,
      token: '',
      username: '',
      deckList: []
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.getdeck = this.getdeck.bind(this);
  }

  logout = () => {
    this.setState({
      token: '',
      auth: false
    });
    navigateTo('/signin');
  };

  login = async (name, pass) => {
    this.setState({
      submitting: true
    });
    let response;
    try {
      response = await axios.post(
        'http://kaioru.ngrok.io/auth/login',
        {
          username: name,
          password: pass
        },
        { httpsAgent: new https.Agent({ rejectUnauthorized: false }) }
      );
      if (response.status === 200) {
        console.log(response.data.token);
        navigateTo('/home');
        this.setState({
          auth: true,
          submitting: false,
          token: response.data.token,
          username: response.data.username
        });
      } else {
        console.log('Error connecting to server');
        this.setState({
          submitting: false
        });
      }
      return response;
    } catch (err) {
      this.setState({
        submitting: false
      });
      response = err.response;
      return err.response;
    }
  };

  getdeck = async () => {
    const { token } = this.state;
    try {
      const response = await axios.get('http://kaioru.ngrok.io/decks', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      if (response.status === 200) {
        this.setState({ deckList: response.data });
      }
      console.log(response);
      return response;
    } catch (err) {
      return err;
    }
  };

  render() {
    const props = {
      auth: this.state.auth,
      submitting: this.state.submitting,
      token: this.state.token,
      username: this.state.username,
      login: this.login,
      logout: this.logout,
      getdeck: this.getdeck,
      decklist: this.state.deckList
    };
    return (
      <div>
        <Routes {...props} />
      </div>
    );
  }
}

export default App;
