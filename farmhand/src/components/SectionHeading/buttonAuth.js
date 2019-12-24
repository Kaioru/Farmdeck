import React, { Component } from "react";
import logo from "../../assets/farmicon.jpg";
import {
  Button,
  AvatarMenu,
  Avatar,
  MenuDivider,
  MenuItem,
  Modal,
  Input
} from "react-rainbow-components";
import { navigateTo } from "../../history";
import axios from "axios";
import "./styles.css";

const IsAuth = props => {
  const { auth, onAddDeckClick } = props;
  if (auth) {
    return (
      <AvatarMenu
        src={logo}
        assistiveText="Farmdeck"
        menuAlignment="right"
        menuSize="small"
        title="Farmdeck"
      >
        <li className="rainbow-p-horizontal_small rainbow-align_center rainbow-flex">
          <Avatar
            src={logo}
            assistiveText="Farmdeck"
            title="Farmdeck"
            size="medium"
          />
          <div className="rainbow-m-left_x-small">
            <p className="rainbow-font-size-text_medium rainbow-color_dark-1">
              Farmdeck
            </p>
            <p className="rainbow-font-size-text_small rainbow-color_gray-3">
              Best deck ever
            </p>
          </div>
        </li>
        <MenuDivider variant="space" />
        <MenuItem
          label="Add Deck"
          iconPosition="left"
          onClick={() => onAddDeckClick()}
        />
        <MenuItem label="Logout" iconPosition="left" />
      </AvatarMenu>
    );
  } else {
    return (
      <Button
        label="Sign In"
        onClick={() => navigateTo("/signin")}
        variant="brand"
        className="rainbow-m-around_medium"
      />
    );
  }
};

export default class ButtonAuth extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, name: "", error: "", isLoading: false };
    this.onAddDeckClick = this.onAddDeckClick.bind(this);
  }

  postdeck = async (guid, name) => {
    const { token } = this.props;

    this.setState = {
      isLoading: true
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/decks",
        {
          guid: guid,
          name: name
        },
        {
          headers: { Authorization: "Bearer " + token }
        }
      );
      return response;
    } catch (err) {
      return err;
    }
  };

  onSubmit = () => {};

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onAddDeckClick = () => {
    return this.setState({ isOpen: true });
    /*this.postdeck("8c8676ba-b1a9-425c-8b14-64e3ec6128ce", "lmao");*/
  };

  handleOnClose = () => {
    return this.setState({ isOpen: false });
  };

  render() {
    const { name, error } = this.state;
    return (
      <div>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.handleOnClose}
          title="Add Deck"
        >
          <Input
            name="name"
            error={error}
            placeholder="Name"
            type="text"
            value={name}
            onChange={this.onChange}
            className="username"
          />
          <Button
            label="Submit"
            variant="neutral"
            form="signUpForm"
            type="submit"
            isLoading={submitting}
            className="rainbow-m-vertical_x-large rainbow-m-horizontal_medium rainbow-m_auto"
          />
        </Modal>
        <IsAuth auth={this.props.auth} onAddDeckClick={this.onAddDeckClick} />
      </div>
    );
  }
}
