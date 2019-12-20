import React, { Component } from "react";
import SpeechRecognition from "react-speech-recognition";
import { Button } from "react-rainbow-components";

class Dictaphone extends Component {
  onClick = () => {
    const { listening, startListening } = this.props;
    return listening ? this.sendData : startListening;
  };
  sendData = () => {
    const { callbackFunction, transcript, stopListening } = this.props;
    stopListening();
    return callbackFunction(transcript);
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
        <Button onClick={resetTranscript}>Reset</Button>
        {listening ? (
          <Button onClick={this.onClick()}>Stop</Button>
        ) : (
          <Button onClick={this.onClick()}>Start</Button>
        )}
      </div>
    );
  }
}
const options = {
  autoStart: false,
  continuous: true
};
export default SpeechRecognition(options)(Dictaphone);
