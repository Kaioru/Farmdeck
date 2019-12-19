import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import '../app.dart';
import '../app_state.dart';
import '../settings.dart';

class Login extends StatefulWidget {
  @override
  _Login createState() => new _Login();
}

class _Login extends State<Login> {
  final userController = TextEditingController();
  final passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
        child: Form(
      child: Container(
        alignment: Alignment.center,
        padding: EdgeInsets.all(24.0),
        child: ListView(
          shrinkWrap: true,
          children: <Widget>[
            Hero(
              tag: 'hero',
              child: Text(
                "FarmDeck",
                style: TextStyle(fontSize: 48.0, fontWeight: FontWeight.bold),
              ),
            ),
            SizedBox(height: 24.0),
            CupertinoTextField(
              controller: userController,
              prefix: const Icon(
                CupertinoIcons.person,
                color: CupertinoColors.lightBackgroundGray,
                size: 28,
              ),
              padding: EdgeInsets.symmetric(horizontal: 6, vertical: 12),
              placeholder: 'Username',
              autocorrect: false,
              onChanged: (text) {},
            ),
            CupertinoTextField(
              controller: passwordController,
              prefix: const Icon(
                CupertinoIcons.pencil,
                color: CupertinoColors.lightBackgroundGray,
                size: 28,
              ),
              padding: EdgeInsets.symmetric(horizontal: 6, vertical: 12),
              placeholder: 'Password',
              obscureText: true,
              autocorrect: false,
              onChanged: (text) {},
            ),
            SizedBox(height: 12.0),
            CupertinoButton.filled(
              onPressed: () async {
                var uri = Uri.http(Settings.API_URL, "/auth/login");
                var response = await http.post(uri.toString(),
                    headers: {'Content-Type': "application/json"},
                    body: json.encode({
                      'username': userController.text,
                      'password': passwordController.text
                    }));

                if (response.statusCode == 200) {
                  var token = json.decode(response.body)['token'];
                  Navigator.pushReplacement(
                      context,
                      CupertinoPageRoute(
                          builder: (context) => App(AppState(token))));
                } else {
                  showCupertinoDialog(
                      context: context,
                      builder: (BuildContext context) => CupertinoAlertDialog(
                            title: new Text("Login failed"),
                            content:
                                new Text("Boohoo! Let's try again shall we?"),
                            actions: [
                              CupertinoDialogAction(
                                  onPressed: () =>
                                      Navigator.of(context, rootNavigator: true)
                                          .pop(),
                                  isDefaultAction: true,
                                  child: new Text("Close"))
                            ],
                          ));
                }
              },
              child: Text("Login"),
            ),
            CupertinoButton(
              onPressed: () async {
                var uri = Uri.http(Settings.API_URL, "/auth/register");
                var response = await http.post(uri.toString(),
                    headers: {'Content-Type': "application/json"},
                    body: json.encode({
                      'username': userController.text,
                      'password': passwordController.text,
                      'confirmpassword': passwordController.text
                    }));

                if (response.statusCode == 200) {
                  var token = json.decode(response.body)['token'];
                  Navigator.pushReplacement(
                      context,
                      CupertinoPageRoute(
                          builder: (context) => App(AppState(token))));
                } else {
                  showCupertinoDialog(
                      context: context,
                      builder: (BuildContext context) => CupertinoAlertDialog(
                            title: new Text("Register failed"),
                            content:
                                new Text("Boohoo! Let's try again shall we?"),
                            actions: [
                              CupertinoDialogAction(
                                  onPressed: () =>
                                      Navigator.of(context, rootNavigator: true)
                                          .pop(),
                                  isDefaultAction: true,
                                  child: new Text("Close"))
                            ],
                          ));
                }
              },
              child: Text("Register"),
            )
          ],
        ),
      ),
    ));
  }
}

final usernameController = TextEditingController();
