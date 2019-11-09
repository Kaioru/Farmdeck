import React, { Component } from "react";
import { Card, Button } from "react-rainbow-components";
import "./styles.css";
import environment from "../../assets/icons/environment.svg";
import lighthouse from "../../assets/icons/lighthouse.svg";
import music from "../../assets/icons/music.svg";
import controller from "../../assets/icons/controller.svg";
import axios from "axios";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      pump: false,
      light: false,
      sound: false,
      motor: 0,
      response: null
    };
  }

  POST = async (type, placeholder) => {
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email: type,
        password: placeholder
      });
      this.setState({
        response: response
      });
    } catch (err) {
      return err;
    }
  };
  onClick = (type, placeholder) => {
    this.POST(type, placeholder);
  };

  render() {
    const { pump, light, sound, motor } = this.state;
    return (
      <div className="react-rainbow-admin-forms_container rainbow-background-color_gray-1">
        <section className="react-rainbow-admin-forms_section rainbow-p-top_large">
          <Card className="react-rainbow-admin-forms_card rainbow-p-top_large">
            <div className="react-rainbow-admin-forms_header">
              <img
                src={environment}
                alt="environment"
                className="react-rainbow-admin-forms_logo"
              />
              {pump ? (
                <h1>Last watering: 0 days</h1>
              ) : (
                <h1>Last watering: 2 days</h1>
              )}
            </div>
            <article className="textContainer">
              <Button
                className="rainbow-m-top_medium"
                type="button"
                variant="brand"
                onClick={() => this.onClick("eve.holt@reqres.in", "cityslicka")}
              >
                <span>Water the plants</span>
              </Button>
            </article>
          </Card>
          <Card className="react-rainbow-admin-forms_card rainbow-p-top_large">
            <div className="react-rainbow-admin-forms_header">
              <img
                src={lighthouse}
                alt="lighthouse"
                className="react-rainbow-admin-forms_logo"
              />
              <h1>Light is currently ON</h1>
            </div>
            <article className="textContainer">
              <Button
                className="rainbow-m-top_medium"
                type="button"
                variant="brand"
              >
                <span>Turn on the lights</span>
              </Button>
            </article>
          </Card>

          <Card className="react-rainbow-admin-forms_card rainbow-p-top_large">
            <div className="react-rainbow-admin-forms_header">
              <img
                src={music}
                alt="music"
                className="react-rainbow-admin-forms_logo"
              />
              <h1>Music is currently OFF</h1>
            </div>
            <article className="textContainer">
              <Button
                className="rainbow-m-top_medium"
                type="button"
                variant="brand"
              >
                <span>Turn on music</span>
              </Button>
            </article>
          </Card>
          <Card className="react-rainbow-admin-forms_card rainbow-p-top_large">
            <div className="react-rainbow-admin-forms_header">
              <img
                src={controller}
                alt="controller"
                className="react-rainbow-admin-forms_logo"
              />
              <h1>The sun is shining from 182° clockwise</h1>
            </div>
            <article className="textContainer">
              <Button
                className="rainbow-m-top_medium"
                type="button"
                variant="brand"
              >
                <span>Turn 90° clockwise</span>
              </Button>
            </article>
          </Card>
        </section>
      </div>
    );
  }
}
