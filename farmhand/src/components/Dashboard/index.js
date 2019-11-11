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
      light: 0,
      sound: 0,
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
      light,
      sound,
      motor,
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
        let count = light + 1;
        this.setState({
          lightIsLoading: true
        });

        response = await this.POST(type, count % 3);
        if (response.status === 200) {
          this.setState({
            light: count,
            lightIsLoading: false
          });
        } else {
          console.log("Error connecting to server");
          this.setState({
            lightIsLoading: false
          });
        }
        break;

      case "sound":
        let count = sound + 1;
        this.setState({
          soundIsLoading: true
        });

        response = await this.POST(type, count % 3);
        if (response.status === 200) {
          this.setState({
            sound: count,
            soundIsLoading: false
          });
        } else {
          console.log("Error connecting to server");
          this.setState({
            soundIsLoading: false
          });
        }
      case "motor":
        let count = motor + 1;
        this.setState({
          motorIsLoading:true;
        })
        response = await this.POST(type, count % 3;
        if (response === 200) {
          this.setState({
            motor: count + 1;
            motorIsLoading: false;
          });
        } else {
          console.log("Error connecting to server");
          this.setState({
            motorIsLoading: false
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
      case "light":
        if (text === "title") {
          if (light % 3 === 0) {
            return <h1>Light is OFF</h1>;
          } else if (light % 3 === 1){
            return <h1>Light is ON</h1>;
          } else if (light % 3 === 2){
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
          } else if (sound % 3 === 1){
            return <h1>Sound is ON</h1>;
          } else if (sound % 3 === 2){
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
          } else if (motor % 3 === 1){
            return <h1>Motor is ON</h1>;
          } else if (motor % 3 === 2){
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
    const { pump, pumpIsLoading, light, sound, motor } = this.state;
    return (
      <div className="react-rainbow-admin-forms_container rainbow-background-color_gray-1">
        <div>
          <section className="react-rainbow-admin-forms_section">
            <Card className="react-rainbow-admin-forms_card rainbow-p-top_large">
              <div className="react-rainbow-admin-forms_header">
                <img
                  src={environment}
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
                  src={lighthouse}
                  alt="lighthouse"
                  className="react-rainbow-admin-forms_logo"
                />

                {this.setText("light", "title")}
              </div>
              <article className="textContainer">
                <Button
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
                  src={music}
                  alt="music"
                  className="react-rainbow-admin-forms_logo"
                />
                {this.setText("sound", "title")}
              </div>
              <article className="textContainer">
                <Button
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
                  src={controller}
                  alt="controller"
                  className="react-rainbow-admin-forms_logo"
                />
                {this.setText("motor", "title")}
              </div>
              <article className="textContainer">
                <Button
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
        </div>
      </div>
    );
  }
}
