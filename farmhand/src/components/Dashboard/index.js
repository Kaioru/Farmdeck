import React, { Component } from "react";
import { Card, Button } from "react-rainbow-components";
import "./styles.css";
import waterOn from "../../assets/icons/water-on.png";
import waterOff from "../../assets/icons/water-off.png";
import lightOn from "../../assets/icons/light-on.png";
import lightOff from "../../assets/icons/light-off.png";
import soundOn from "../../assets/icons/sound-on.png";
import soundOff from "../../assets/icons/sound-off.png";
import motorOn from "../../assets/icons/motor-on.png";
import motorOff from "../../assets/icons/motor-off.png";
import axios from "axios";
import https from "https";
import Dictaphone from "../SpeechRecognition";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      pump: 0,
      light: 0,
      sound: 0,
      motor: 0,
      response: null,
      error: null,
      transcript: "",
      pumpIsLoading: false,
      lightIsLoading: false,
      soundIsLoading: false,
      motorIsLoading: false
    };
  }

  POST = async (name, state) => {
    let isLoading = name + "IsLoading";
    this.setState({
      [isLoading]: true
    });
    try {
      const response = await axios.post(
        "http://localhost:5000/deck/toggle",
        {
          type: name,
          state: state
        },
        { httpsAgent: new https.Agent({ rejectUnauthorized: false }) }
      );
      if (response.status === 200) {
        this.setState({
          [name]: state,
          [isLoading]: false
        });
      } else {
        console.log("Error connecting to server");
        this.setState({
          [isLoading]: false
        });
      }
    } catch (err) {
      return false;
    }
  };

  receiveText = text => {
    let pump = text.includes("pump") || text.includes("water");
    let light = text.includes("lights") || text.includes("light");
    let sound = text.includes("sound") || text.includes("music");
    let motor = text.includes("motor") || text.includes("gear");
    this.setState({ transcript: text });

    if (text.includes("on")) {
      if (pump) this.POST("pump", 1);
      else if (light) this.POST("light", 1);
      else if (sound) this.POST("sound", 1);
      else if (motor) this.POST("motor", 1);
    } else if (text.includes("automate") || text.includes("automatic")) {
      if (pump) this.POST("pump", 2);
      else if (light) this.POST("light", 2);
      else if (sound) this.POST("sound", 2);
      else if (motor) this.POST("motor", 2);
    } else if (text.includes("off")) {
      if (pump) this.POST("pump", 0);
      else if (light) this.POST("light", 0);
      else if (sound) this.POST("sound", 0);
      else if (motor) this.POST("motor", 0);
    }
  };

  onClick = async type => {
    const { pump, light, sound, motor } = this.state;
    let count;

    switch (type) {
      case "pump":
        count = pump + 1;
        this.POST("pump", count % 3);
        break;

      case "light":
        count = light + 1;
        this.POST("light", count % 3);
        break;

      case "sound":
        count = sound + 1;
        this.POST("sound", count % 3);
        break;

      case "motor":
        count = motor + 1;
        this.POST("motor", count % 3);
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
          if (pump % 3 === 0) {
            return <h1>Pump is OFF</h1>;
          } else if (pump % 3 === 1) {
            return <h1>Pump is ON</h1>;
          } else if (pump % 3 === 2) {
            return <h1>Pump is automatic</h1>;
          }
        } else {
          if (pump % 3 === 0) {
            return <span>Turn on pump</span>;
          } else if (pump % 3 === 1) {
            return <span>Automate pump</span>;
          } else if (pump % 3 === 2) {
            return <span>Turn off pump</span>;
          }
        }
        break;
      case "light":
        if (text === "title") {
          if (light % 3 === 0) {
            return <h1>Light is OFF</h1>;
          } else if (light % 3 === 1) {
            return <h1>Light is ON</h1>;
          } else if (light % 3 === 2) {
            return <h1>Light is automatic</h1>;
          }
        } else {
          if (light % 3 === 0) {
            return <span>Turn on lights</span>;
          } else if (light % 3 === 1) {
            return <span>Automate lights</span>;
          } else if (light % 3 === 2) {
            return <span>Turn off lights</span>;
          }
        }
        break;

      case "sound":
        if (text === "title") {
          if (sound % 3 === 0) {
            return <h1>Sound is OFF</h1>;
          } else if (sound % 3 === 1) {
            return <h1>Sound is ON</h1>;
          } else if (sound % 3 === 2) {
            return <h1>Sound is automatic</h1>;
          }
        } else {
          if (sound % 3 === 0) {
            return <span>Turn on sound</span>;
          } else if (sound % 3 === 1) {
            return <span>Automate sound</span>;
          } else if (sound % 3 === 2) {
            return <span>Turn off sound</span>;
          }
        }
        break;
      case "motor":
        if (text === "title") {
          if (motor % 3 === 0) {
            return <h1>Motor is OFF</h1>;
          } else if (motor % 3 === 1) {
            return <h1>Motor is ON</h1>;
          } else if (motor % 3 === 2) {
            return <h1>Motor is automatic</h1>;
          }
        } else {
          if (motor % 3 === 0) {
            return <span>Turn on motor</span>;
          } else if (motor % 3 === 1) {
            return <span>Automate motor</span>;
          } else if (motor % 3 === 2) {
            return <span>Turn off motor</span>;
          }
        }
        break;

      default:
        break;
    }
  };

  render() {
    const {
      pump,
      light,
      sound,
      motor,
      pumpIsLoading,
      lightIsLoading,
      soundIsLoading,
      motorIsLoading
    } = this.state;
    return (
      <div className="react-rainbow-admin-forms_container rainbow-background-color_gray-1">
        <div>
          <section className="react-rainbow-admin-forms_section">
            <Card className="react-rainbow-admin-forms_card rainbow-p-top_large">
              <div className="react-rainbow-admin-forms_header">
                <img
                  src={pump === 1 || pump === 2 ? waterOn : waterOff}
                  alt="environment"
                  className="react-rainbow-admin-forms_logo"
                />
                {this.setText("pump", "title")}
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
                </Button>
              </article>
            </Card>
            <Card className="react-rainbow-admin-forms_card rainbow-p-top_large">
              <div className="react-rainbow-admin-forms_header">
                <img
                  src={light === 1 || light === 2 ? lightOn : lightOff}
                  alt="lighthouse"
                  className="react-rainbow-admin-forms_logo"
                />

                {this.setText("light", "title")}
              </div>
              <article className="textContainer">
                <Button
                  isLoading={lightIsLoading}
                  className="rainbow-m-top_medium"
                  type="button"
                  variant="brand"
                  onClick={() => this.onClick("light")}
                >
                  {this.setText("light", "body")}
                </Button>
              </article>
            </Card>

            <Card className="react-rainbow-admin-forms_card rainbow-p-top_large">
              <div className="react-rainbow-admin-forms_header">
                <img
                  src={sound === 1 || sound === 2 ? soundOn : soundOff}
                  alt="music"
                  className="react-rainbow-admin-forms_logo"
                />
                {this.setText("sound", "title")}
              </div>
              <article className="textContainer">
                <Button
                  isLoading={soundIsLoading}
                  className="rainbow-m-top_medium"
                  type="button"
                  variant="brand"
                  onClick={() => this.onClick("sound")}
                >
                  {this.setText("sound", "body")}
                </Button>
              </article>
            </Card>
            <Card className="react-rainbow-admin-forms_card rainbow-p-top_large">
              <div className="react-rainbow-admin-forms_header">
                <img
                  src={motor === 1 || motor === 2 ? motorOn : motorOff}
                  alt="controller"
                  className="react-rainbow-admin-forms_logo"
                />
                {this.setText("motor", "title")}
              </div>
              <article className="textContainer">
                <Button
                  isLoading={motorIsLoading}
                  className="rainbow-m-top_medium"
                  type="button"
                  variant="brand"
                  onClick={() => this.onClick("motor")}
                >
                  {this.setText("motor", "body")}
                </Button>
              </article>
            </Card>
          </section>
          <section className="voice-recog-container">
            <Dictaphone callbackFunction={this.receiveText}></Dictaphone>
          </section>
        </div>
      </div>
    );
  }
}
