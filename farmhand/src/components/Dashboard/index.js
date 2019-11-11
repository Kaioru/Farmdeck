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
      pump: 0,
      light: false,
      sound: false,
      motor: 0,
      response: null,
      error: null,

      pumpIsLoading: false,
      lightIsLoading: false,
      soundIsLoading: false,
      motorIsLoading: false
    };
  }

  POST = async (name, state) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/panel/toggle",
        {
          type: name,
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
    const {
      pump,
      pumpIsLoading,
      light,
      lightIsLoading,
      sound,
      soundIsLoading,
      motor,
      motorIsLoading
    } = this.state;
    let response;

    switch (type) {
      case "pump":
        let count = pump + 1;
        this.setState({
          pumpIsLoading: true
        });

        response = await this.POST(type, count % 3);
        if (response.status === 200) {
          this.setState({
            pump: count,
            pumpIsLoading: false
          });
        } else {
          console.log("Error connecting to server");
          this.setState({
            pumpIsLoading: false
          });
        }

        break;
      case "light":
        if (light) {
          response = await this.POST(type, 0);
          this.setState({
            light: response ? false : true
          });
        } else {
          response = await this.POST(type, 1);
          this.setState({
            light: response ? true : false
          });
        }
        break;
      case "sound":
        if (sound) {
          response = await this.POST(type, 0);
          this.setState({
            sound: response ? false : true
          });
        } else {
          response = await this.POST(type, 1);
          this.setState({
            sound: response ? true : false
          });
        }
        break;
      case "motor":
        response = await this.POST(type, 1);
        if (response) {
          this.setState({
            motor: motor < 270 ? motor + 90 : 0
          });
        }
        break;
      default:
        break;
    }
  };

  setText = (type, text) => {
    const { pump, light, sound, motor } = this.state;
    switch (type) {
      case "pump":
        if (text === "title") {
          if (pump !== 0) {
            return <h1>Last watering: 0 days</h1>;
          } else {
            return <h1>Last watering: 2 days</h1>;
          }
        } else {
          if (pump % 3 === 0) {
            return <span>Turn on watering</span>;
          } else if (pump % 3 === 1) {
            return <span>Automate watering</span>;
          } else if (pump % 3 === 2) {
            return <span>Turn off watering</span>;
          }
        }
        break;
      default:
        break;
    }
  };
  render() {
    const { pump, pumpIsLoading, light, sound, motor } = this.state;
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
              {pump !== 0 ? (
                <h1>Last watering: 0 days</h1>
              ) : (
                <h1>Last watering: 2 days</h1>
              )}
            </div>
            <article className="textContainer">
              <Button
                isLoading={pumpIsLoading}
                className="rainbow-m-top_medium"
                type="button"
                variant="brand"
                onClick={() => this.onClick("pump")}
              >
                {this.setText("pump", "body")}
                {console.log(this.setText("pump", "body"))}
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
                onClick={() => this.onClick("sound")}
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
              <h1>The plants are facing {motor}° clockwise from center</h1>
            </div>
            <article className="textContainer">
              <Button
                className="rainbow-m-top_medium"
                type="button"
                variant="brand"
                onClick={() => this.onClick("motor")}
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
