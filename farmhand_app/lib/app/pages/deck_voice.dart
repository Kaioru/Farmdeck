import 'package:flutter/cupertino.dart';
import '../app_state.dart';

class DeckVoice extends StatefulWidget {
  final AppState state;

  DeckVoice(this.state);

  @override
  State<StatefulWidget> createState() => _DeckVoice(state);
}

class _DeckVoice extends State<DeckVoice> {
  final AppState state;

  _DeckVoice(this.state);

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      child: Container(),
    );
  }
}