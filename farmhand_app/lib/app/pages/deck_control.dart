import 'package:farmhand_app/app/core/deck.dart';
import 'package:farmhand_app/app/pages/deck_control_button.dart';
import 'package:flutter/cupertino.dart';
import '../app_state.dart';

class DeckControl extends StatefulWidget {
  final AppState state;
  final Deck deck;

  DeckControl(this.state, this.deck);

  @override
  State<StatefulWidget> createState() => _DeckControl(state, deck);
}

class _DeckControl extends State<DeckControl> {
  final AppState state;
  final Deck deck;

  _DeckControl(this.state, this.deck);

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
        child: SafeArea(
      child: CustomScrollView(slivers: <Widget>[
        SliverList(
          delegate: SliverChildListDelegate([
            DeckControlButton(state, deck, 'light', 'O\' Lord giveth us light!'),
            DeckControlButton(state, deck, 'water', 'Came through drippin\', drip drip.'),
            DeckControlButton(state, deck, 'sound', 'Get ready your escoots.'),
            DeckControlButton(state, deck, 'motor', 'Vroo vroo! Rotate-o-sa!'),
          ]),
        )
      ]),
    ));
  }
}
