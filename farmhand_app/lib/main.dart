import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import 'app/auth/login.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
      DeviceOrientation.portraitDown,
    ]);

    return CupertinoApp(
      debugShowCheckedModeBanner: false,
      title: 'FarmDeck',
      home: Login(),
    );
  }
}
