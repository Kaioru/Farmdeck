import React, { Component } from 'react';
import logo from '../../assets/farmicon.jpg';
import { Button, AvatarMenu, Avatar, MenuDivider, MenuItem, Modal, Input } from 'react-rainbow-components';
import { navigateTo } from '../../history';
import axios from 'axios';
import './styles.css';

const IsAuth = props => {
  const { auth, onAddDeckClick, logout, username } = props;
  if (auth) {
    return (
      <AvatarMenu src={logo} assistiveText="Farmdeck" menuAlignment="right" menuSize="small" title="Farmdeck">
        <li className="rainbow-p-horizontal_small rainbow-align_center rainbow-flex">
          <Avatar src={logo} assistiveText="Farmdeck" title={username} size="medium" />
          <div className="rainbow-m-left_x-small">
            <p className="rainbow-font-size-text_medium rainbow-color_dark-1">{username}</p>
            <p className="rainbow-font-size-text_small rainbow-color_gray-3">Best deck ever</p>
          </div>
        </li>
        <MenuDivider variant="space" />
        <MenuItem label="Add Deck" iconPosition="left" onClick={onAddDeckClick} />
        <MenuItem label="Sign Out" iconPosition="left" onClick={() => logout()} />
      </AvatarMenu>
    );
  } else {
    return (
      <Button
        label="Sign In"
        onClick={() => navigateTo('/signin')}
        variant="brand"
        className="rainbow-m-around_medium"
      />
    );
  }
};

export default class ButtonAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      name: '',
      error: '',
      isLoading: false
    };
    this.onAddDeckClick = this.onAddDeckClick.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
  }

  postdeck = async (guid, name) => {
    const { token } = this.props;

    this.setState({ isLoading: true });

    try {
      const response = await axios.post(
        'http://kaioru.ngrok.io/decks',
        {
          name: name
        },
        {
          headers: { Authorization: 'Bearer ' + token }
        }
      );
      if (response.status === 200) {
        await this.props.getdeck();
        this.setState({
          isOpen: false
        });
      }
      this.setState({
        isLoading: false
      });
    } catch (err) {
      if (err.response.status === 400) {
        this.setState({ error: 'Please input a name' });
      } else if (err.response.status === 403) {
        console.log(err.response);
        this.setState({
          error: 'Name is taken, please enter another'
        });
      }

      this.setState({
        isLoading: false
      });
    }
  };

  onSubmit = event => {
    this.postdeck('8c8676ba-b1a9-425c-8b14-64e3ec6128ce', this.state.name);
    event.preventDefault();
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onAddDeckClick = () => {
    return this.setState({ isOpen: true });
  };

  handleOnClose = () => {
    return this.setState({ isOpen: false });
  };

  render() {
    const { name, error, isLoading } = this.state;
    return (
      <div>
        <Modal isOpen={this.state.isOpen} onRequestClose={this.handleOnClose} title="Add Deck">
          <form id="addDeckForm" onSubmit={this.onSubmit}>
            <Input
              name="name"
              error={error}
              placeholder="Name"
              type="text"
              value={name}
              onChange={this.onChange}
              className="username"
            />
            <div className="submit">
              <Button label="Submit" variant="neutral" form="addDeckForm" type="submit" isLoading={isLoading} />
            </div>
          </form>
        </Modal>
        <IsAuth
          auth={this.props.auth}
          onAddDeckClick={this.onAddDeckClick}
          logout={this.props.logout}
          username={this.props.username}
        />
      </div>
    );
  }
}
