import 'package:farmhand_app/app/core/deck.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../app.dart';
import '../app_state.dart';
import '../settings.dart';

class DeckSettings extends StatefulWidget {
  final AppState state;
  final Deck deck;

  DeckSettings(this.state, this.deck);

  @override
  State<StatefulWidget> createState() => _DeckSettings(state, deck);
}

class _DeckSettings extends State<DeckSettings> {
  final AppState state;
  final Deck deck;

  _DeckSettings(this.state, this.deck);

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      child: SafeArea(
        child: Container(
          alignment: Alignment.topLeft,
          padding: EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(
                "Delete?",
                style: TextStyle(fontSize: 24.0, fontWeight: FontWeight.bold),
              ),
              Text(
                "Oh my god please no no no Eleanor please don't end me, pleaseee!",
                style: TextStyle(fontSize: 14.0),
              ),
              SizedBox(height: 24.0),
              CupertinoButton(
                color: Colors.red,
                onPressed: () {
                  showCupertinoDialog(
                      context: context,
                      builder: (BuildContext context) => CupertinoAlertDialog(
                            title: new Text("Are you f'real?"),
                            content: new Text(
                                "Are you really really reaaaaaaally sure?"),
                            actions: [
                              CupertinoDialogAction(
                                  onPressed: () async {
                                    var uri = Uri.http(
                                        Settings.API_URL, "/decks/" + deck.id);
                                    await http.delete(uri.toString(), headers: {
                                      'Content-Type': "application/json",
                                      'Authorization': 'Bearer ' + state.token
                                    });

                                    Navigator.pushReplacement(
                                        context,
                                        CupertinoPageRoute(
                                            builder: (context) => App(state)));
                                  },
                                  isDestructiveAction: true,
                                  child: new Text("Delete")),
                              CupertinoDialogAction(
                                  onPressed: () =>
                                      Navigator.of(context, rootNavigator: true)
                                          .pop(),
                                  isDefaultAction: true,
                                  child: new Text("Close"))
                            ],
                          ));
                },
                child: Text("Delete Deck"),
              )
            ],
          ),
        ),
      ),
    );
  }
}
