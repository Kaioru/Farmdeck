import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../app_state.dart';
import 'package:speech_to_text/speech_to_text.dart' as stt;

class DeckVoice extends StatefulWidget {
  final AppState state;

  DeckVoice(this.state);

  @override
  State<StatefulWidget> createState() => _DeckVoice(state);
}

class _DeckVoice extends State<DeckVoice> {
  final AppState state;
  final speech = stt.SpeechToText();

  bool recording = false;
  String inputText = "";
  String finalInputText = "";

  _DeckVoice(this.state);

  @override
  void initState() {
    super.initState();
    speech.initialize(onStatus: (status) {}, onError: (error) {});
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
        child: SafeArea(
      child: Container(
          padding: EdgeInsets.all(24.0),
          child: Column(
            children: <Widget>[
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: <Widget>[
                    Text(inputText,
                        style: TextStyle(
                          fontSize: 24.0,
                          fontWeight: FontWeight.bold,
                          color: Colors.grey,
                        )),
                  ],
                ),
              ),
              Center(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: <Widget>[
                    Text(
                      recording
                          ? "Go on, we're listening.."
                          : "Tap the mic to start!",
                      style: TextStyle(
                          fontSize: 24.0, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(width: 18.0),
                    FloatingActionButton(
                      backgroundColor:
                          recording ? Colors.redAccent : Colors.blueAccent,
                      child: Icon(Icons.mic),
                      elevation: 0,
                      onPressed: () {
                        setState(() {
                          if (!recording) {
                            recording = true;
                            speech.listen(onResult: (result) {
                              setState(() {
                                inputText = result.recognizedWords;
                                if (!result.finalResult) return;
                                var input = inputText.toLowerCase().split(" ");

                                var type = "";
                                var newState = -1;

                                if (input.contains("light") ||
                                    input.contains("lights"))
                                  type = "light";
                                else if (input.contains("water") ||
                                    input.contains("watering"))
                                  type = "water";
                                else if (input.contains("motor") ||
                                    input.contains("servo") ||
                                    input.contains("turn"))
                                  type = "motor";
                                else if (input.contains("sound") ||
                                    input.contains("sounds") ||
                                    input.contains("music")) type = "sound";

                                if (input.contains("on"))
                                  newState = 1;
                                else if (input.contains("off"))
                                  newState = 0;
                                else if (input.contains("auto")) newState = 2;

                                if (newState > -1 && type != "") {
                                  setState(() {
                                    inputText = "setting the " +
                                        type +
                                        "s to " +
                                        (newState == 1
                                            ? "on"
                                            : (newState == 0 ? "off" : "auto"));
                                  });
                                } else {
                                  setState(() {
                                    inputText = "i don't understand..";
                                  });
                                }
                              });
                            });
                          } else {
                            recording = false;
                            speech.stop();
                          }
                        });
                      },
                    ),
                  ],
                ),
              ),
            ],
          )),
    ));
  }
}
