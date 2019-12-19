import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'app_state.dart';
import 'core/deck.dart';
import 'settings.dart';

class App extends StatefulWidget {
  final AppState state;

  App(this.state);

  @override
  State<StatefulWidget> createState() => _App(state);
}

class _App extends State<App> {
  final AppState state;

  _App(this.state);

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
        child: CustomScrollView(
      slivers: <Widget>[
        CupertinoSliverNavigationBar(
          largeTitle: Text("Decks"),
        ),
        SliverPadding(
          padding: MediaQuery.of(context)
              .removePadding(
                removeTop: true,
                removeLeft: true,
                removeRight: true,
              )
              .padding
              .copyWith(top: 13.0),
          sliver: FutureBuilder(future: Future(() async {
            var uri = Uri.http(Settings.API_URL, "/decks");
            var response = await http.get(uri.toString(), headers: {
              'Content-Type': "application/json",
              'Authorization': 'Bearer ' + state.token
            });

            return json.decode(response.body);
          }), builder: (BuildContext context, AsyncSnapshot snapshot) {
            if (snapshot.hasData) {
              var data = snapshot.data;
              var decks = data.map((d) => Deck(d['id'], d['name'])).toList();

              return SliverList(
                delegate: SliverChildBuilderDelegate(
                    (BuildContext context, int index) {
                  return GestureDetector(
                    child: Container(
                      child: Container(
                        padding: EdgeInsets.all(13.0),
                        child: Row(
                          children: <Widget>[
                            Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: <Widget>[
                                Text(
                                  decks[index].name,
                                  style: TextStyle(
                                      fontSize: 24.0,
                                      color: Colors.black,
                                      fontWeight: FontWeight.bold),
                                ),
                                Text(decks[index].id.substring(20),
                                    style: TextStyle(
                                        fontSize: 12.0, color: Colors.black54))
                              ],
                            )
                          ],
                        ),
                      ),
                      height: 128.0,
                      margin:
                          EdgeInsets.symmetric(horizontal: 18.0, vertical: 6.0),
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
                }, childCount: decks.length),
              );
            }

            return SliverFillRemaining(
              child: Center(
                child: CupertinoActivityIndicator(),
              ),
            );
          }),
        )
      ],
    ));
  }
}
