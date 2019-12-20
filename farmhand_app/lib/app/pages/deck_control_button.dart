import 'dart:convert';

import 'package:farmhand_app/app/core/deck.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../app_state.dart';
import '../settings.dart';

class DeckControlButton extends StatefulWidget {
  final AppState state;
  final Deck deck;
  final String type;
  final String desc;

  DeckControlButton(this.state, this.deck, this.type, this.desc);

  @override
  State<StatefulWidget> createState() =>
      _DeckControlButton(state, deck, type, desc);
}

class _DeckControlButton extends State<DeckControlButton> {
  final AppState state;
  final Deck deck;
  final String type;
  final String desc;

  bool updating = false;
  bool control = false;
  bool auto = true;

  _DeckControlButton(this.state, this.deck, this.type, this.desc);

  Future update() async {
    setState(() {
      updating = true;
    });

    var newState = auto ? 2 : control ? 1 : 0;

    var uri = Uri.http(Settings.API_URL, "/decks/" + deck.id + "/toggle");

    await http.post(uri.toString(),
        headers: {
          'Content-Type': "application/json",
          'Authorization': 'Bearer ' + state.token
        },
        body: json.encode(
            {'type': (type == 'water' ? 'pump' : type), 'state': newState}));
    await Future.delayed(Duration(seconds: 1));

    setState(() {
      updating = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        if (updating) return;
        control = !control;
        auto = false;
        update();
      },
      onDoubleTap: () {
        if (updating) return;
        auto = !auto;
        control = false;
        update();
      },
      child: Container(
        child: Container(
          padding: EdgeInsets.all(13.0),
          child: Row(
            children: <Widget>[
              Image.asset(
                'assets/images/' +
                    type +
                    "-" +
                    (control ? 'on' : 'off') +
                    '.png',
              ),
              Container(
                child: updating
                    ? Center(
                        child: CupertinoActivityIndicator(),
                      )
                    : Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          Row(
                            children: <Widget>[
                              Text(
                                type,
                                style: TextStyle(
                                    fontSize: 24.0,
                                    color: Colors.black,
                                    fontWeight: FontWeight.bold),
                              ),
                              Text(auto ? " (auto)" : " (manual)",
                                  style: TextStyle(
                                      fontSize: 14.0, color: Colors.black)),
                            ],
                          ),
                          Text(desc,
                              style: TextStyle(
                                  fontSize: 14.0, color: Colors.black)),
                        ],
                      ),
              ),
            ],
          ),
        ),
        height: 128.0,
        margin: EdgeInsets.symmetric(horizontal: 18.0, vertical: 6.0),
        decoration: BoxDecoration(
          color: Colors.white,
          shape: BoxShape.rectangle,
          borderRadius: BorderRadius.circular(13.0),
          boxShadow: <BoxShadow>[
            BoxShadow(
              color: Colors.black26,
              blurRadius: 10.0,
              offset: Offset(0.0, 10.0),
            ),
          ],
        ),
      ),
    );
  }
}
