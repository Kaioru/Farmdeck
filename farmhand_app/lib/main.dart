import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return CupertinoApp(
      title: 'Flutter Demo',
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int wateringState = 0;
  int lightingState = 0;
  int musicState = 0;
  int servoState = 0;

  String getControlName(String control, int state) {
    if (state % 3 == 1)
        return "Automate $control";
    if (state % 3 == 2)
        return "Turn off $control";
    if (state % 3 == 0)
        return "Turn on $control";
  }

  Future toggleControl(String control) async {
    int state = 0;

    switch (control) {
      case "watering":
        wateringState++;
        control = "pump";
        state = wateringState % 3;
        break;
      case "lighting":
        lightingState++;
        control = "light";
        state = lightingState % 3;
        break;
      case "music":
        musicState++;
        control = "sound";
        state = musicState % 3;
        break;
      case "servo":
        servoState++;
        control = "motor";
        state = servoState % 3;
        break;
    }

    var client = new http.Client();

    await client.post('http://localhost:5000/panel/toggle?type=' +
        control +
        '&state=' +
        state.toString());
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: const Text('Buttons'),
      ),
      child: DefaultTextStyle(
        style: CupertinoTheme.of(context).textTheme.textStyle,
        child: SafeArea(
          child: Column(
            children: <Widget>[
              const Padding(
                padding: EdgeInsets.all(16.0),
                child: Text('Here are some super cool controls '
                    'for you to play with!'),
              ),
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    CupertinoButton.filled(
                      child: Text(getControlName('watering', wateringState)),
                      onPressed: () async {
                        await toggleControl('watering');
                        setState(() {});
                      },
                    ),
                    const Padding(padding: EdgeInsets.all(12.0)),
                    CupertinoButton.filled(
                      child: Text(getControlName('lighting', lightingState)),
                      onPressed: () async {
                        await toggleControl('lighting');
                        setState(() {});
                      },
                    ),
                    const Padding(padding: EdgeInsets.all(12.0)),
                    CupertinoButton.filled(
                      child: Text(getControlName('music', musicState)),
                      onPressed: () async {
                        await toggleControl('music');
                        setState(() {});
                      },
                    ),
                    const Padding(padding: EdgeInsets.all(12.0)),
                    CupertinoButton.filled(
                      child: Text(getControlName('servo', servoState)),
                      onPressed: () async {
                        await toggleControl('servo');
                        setState(() {});
                      },
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
