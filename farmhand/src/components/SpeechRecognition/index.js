import React, { Component } from "react";
import SpeechRecognition from "react-speech-recognition";
import { Button } from "react-rainbow-components";
import micOn from "../../assets/icons/mic-on.svg";
import micOff from "../../assets/icons/mic-off.svg";
import reset from "../../assets/icons/reset.svg";
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
      <div>
        <Button onClick={resetTranscript}>
          <img src={reset}></img>
        </Button>
        {listening ? (
          <Button onClick={this.onClick()}>
            <img src={micOn}></img>
          </Button>
        ) : (
          <Button onClick={this.onClick()}>
            <img src={micOff}></img>
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
