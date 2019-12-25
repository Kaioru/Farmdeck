import React, { Component } from "react";
import SpeechRecognition from "react-speech-recognition";
import { Button } from "react-rainbow-components";
import micOn from "../../assets/icons/mic-on.svg";
import micOff from "../../assets/icons/mic-off.svg";
import reset from "../../assets/icons/reset.svg";
import "./styles.css";
class Dictaphone extends Component {
  onClick = () => {
    const { listening, startListening } = this.props;

    return listening ? this.sendData : startListening;
  };
  sendData = () => {
    const { callbackFunction, transcript, stopListening } = this.props;
    stopListening();
    callbackFunction(transcript);
  };

  render() {
    const {
      resetTranscript,
      browserSupportsSpeechRecognition,
      listening
    } = this.props;

    if (!browserSupportsSpeechRecognition) {
      return null;
    }
    return (
      <div className="voice-recog-btn-group">
        <Button className="voice-recog-btn-group-btn" onClick={resetTranscript}>
          <img src={reset} alt="reset"></img>
        </Button>
        {listening ? (
          <Button
            className="voice-recog-btn-group-btn"
            onClick={this.onClick()}
          >
            <img src={micOn} alt="micOn"></img>
          </Button>
        ) : (
          <Button
            className="voice-recog-btn-group-btn"
            onClick={this.onClick()}
          >
            <img src={micOff} alt="micOff"></img>
          </Button>
        )}
      </div>
    );
  }
}
const options = {
  autoStart: false,
  continuous: false
};
export default SpeechRecognition(options)(Dictaphone);
