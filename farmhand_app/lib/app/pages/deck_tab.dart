import 'package:farmhand_app/app/pages/deck_settings.dart';

import '../core/deck.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../app_state.dart';
import 'deck_control.dart';
import 'deck_voice.dart';
import 'deck_stats.dart';

class DeckTab extends StatefulWidget {
  final AppState state;
  final Deck deck;

  DeckTab(this.state, this.deck);

  @override
  State<StatefulWidget> createState() => _DeckTab(state, deck);
}

class _DeckTab extends State<DeckTab> with WidgetsBindingObserver {
  final AppState state;
  final Deck deck;

  PageController pageController;
  int _pageIndex = 0;

  _DeckTab(this.state, this.deck);

  @override
  void initState() {
    pageController = PageController(initialPage: _pageIndex);
    WidgetsBinding.instance.addObserver(this);
    super.initState();
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {}

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(),
      child: CupertinoTabScaffold(
        tabBar: CupertinoTabBar(
          items: <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              icon: Icon(Icons.control_point),
              title: Text('Control'),
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.voice_chat),
              title: Text('Voice'),
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.multiline_chart),
              title: Text('Stats'),
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.settings),
              title: Text('Settings'),
            ),
          ],
        ),
        tabBuilder: (BuildContext context, int index) {
          switch (index) {
            case 0:
              return CupertinoTabView(
                builder: (BuildContext context) => DeckControl(state, deck),
                defaultTitle: 'Control',
              );
              break;
            case 1:
              return CupertinoTabView(
                builder: (BuildContext context) => DeckVoice(state, deck),
                defaultTitle: 'Voice',
              );
              break;
            case 2:
              return CupertinoTabView(
                builder: (BuildContext context) => DeckStats(state),
                defaultTitle: 'Stats',
              );
              break;
            case 3:
              return CupertinoTabView(
                builder: (BuildContext context) => DeckSettings(state, deck),
                defaultTitle: 'Settings',
              );
              break;
          }
          return null;
        },
      ),
    );
  }
}
