import React, { Component } from "react";
import SpeechRecognition from "react-speech-recognition";
import { Button } from "react-rainbow-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophoneAlt,
  faMicrophoneAltSlash,
  faRedo
} from "@fortawesome/free-solid-svg-icons";
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
      listening,
      transcript
    } = this.props;

    if (!browserSupportsSpeechRecognition) {
      return null;
    }
    return (
      <div className="voice-recog-btn-group">
        <Button className="voice-recog-btn-group-btn" onClick={resetTranscript}>
          <FontAwesomeIcon icon={faRedo} />
        </Button>
        {listening ? (
          <Button
            className="voice-recog-btn-group-btn"
            onClick={this.onClick()}
          >
            <FontAwesomeIcon icon={faMicrophoneAlt} />
          </Button>
        ) : (
          <Button
            className="voice-recog-btn-group-btn"
            onClick={this.onClick()}
          >
            <FontAwesomeIcon icon={faMicrophoneAltSlash} />
          </Button>
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
