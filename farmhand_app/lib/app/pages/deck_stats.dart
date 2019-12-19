import 'package:flutter/cupertino.dart';
import '../app_state.dart';

class DeckStats extends StatefulWidget {
  final AppState state;

  DeckStats(this.state);

  @override
  State<StatefulWidget> createState() => _DeckStats(state);
}

class _DeckStats extends State<DeckStats> {
  final AppState state;

  _DeckStats(this.state);

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      child: Container(),
    );
  }
}