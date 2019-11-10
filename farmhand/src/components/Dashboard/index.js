import React, { Component } from "react";
import { Card, Button } from "react-rainbow-components";
import "./styles.css";
import environment from "../../assets/icons/environment.svg";
import lighthouse from "../../assets/icons/lighthouse.svg";
import music from "../../assets/icons/music.svg";
import controller from "../../assets/icons/controller.svg";
import axios from "axios";
import https from "https";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      pump: false,
      light: false,
      sound: false,
      motor: 0,
      response: null,
      error: null
    };
  }

  POST = async (type, state) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/panel/toggle",
        {
          type: type,
          state: state
        },
        { httpsAgent: new https.Agent({ rejectUnauthorized: false }) }
      );
      this.setState({
        response: response
      });
      return true;
    } catch (err) {
      return false;
    }
  };
  onClick = async type => {
    const { pump, light, sound, motor } = this.state;
    let response;

    switch (type) {
      case "pump":
        if (pump) {
          response = await this.POST(type, 0);

          this.setState({
            pump: false ? response : true
          });
        } else {
          response = await this.POST(type, 1);
          this.setState({
            pump: true ? response : false
          });
        }
        break;
      case "light":
        if (light) {
          response = await this.POST(type, 0);
          this.setState({
            light: false ? response : true
          });
        } else {
          response = await this.POST(type, 1);
          this.setState({
            light: true ? response : false
          });
        }
        break;
      case "sound":
        if (sound) {
          response = await this.POST(type, 0);
          this.setState({
            sound: false ? response : true
          });
        } else {
          response = await this.POST(type, 1);
          this.setState({
            sound: true ? response : false
          });
        }
        break;
      case "motor":
        response = await this.POST(type, 1);
        this.setState({
          motor: motor + 90 ? response : motor
        });
        break;
      default:
        break;
    }
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
                onClick={() => this.onClick("pump")}
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

              {light ? (
                <h1>Light is currently ON</h1>
              ) : (
                <h1>Light is currently OFF</h1>
              )}
            </div>
            <article className="textContainer">
              <Button
                className="rainbow-m-top_medium"
                type="button"
                variant="brand"
                onClick={() => this.onClick("light")}
              >
                {light ? (
                  <span>Turn off the lights</span>
                ) : (
                  <span>Turn on the lights</span>
                )}
              </Button>
            </article>
          </Card>

          <Card className="react-rainbow-admin-forms_card rainbow-p-top_large">
            <div className="react-rainbow-admin-forms_header">
              <img
                src={music}
                alt="music"
                className="react-rainbow-admin-forms_logo"
                onClick={() => this.onClick("sound")}
              />
              {sound ? (
                <h1>Music is currently ON</h1>
              ) : (
                <h1>Music is currently OFF</h1>
              )}
            </div>
            <article className="textContainer">
              <Button
                className="rainbow-m-top_medium"
                type="button"
                variant="brand"
              >
                {sound ? (
                  <span>Turn off music</span>
                ) : (
                  <span>Turn on music</span>
                )}
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
              <h1>The sun is shining from {motor}° clockwise</h1>
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
