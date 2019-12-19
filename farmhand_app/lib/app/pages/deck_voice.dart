import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../app_state.dart';

class DeckVoice extends StatefulWidget {
  final AppState state;

  DeckVoice(this.state);

  @override
  State<StatefulWidget> createState() => _DeckVoice(state);
}

class _DeckVoice extends State<DeckVoice> {
  final AppState state;

  bool recording = false;
  String inputText = "";

  _DeckVoice(this.state);

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
                          recording = !recording;
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
