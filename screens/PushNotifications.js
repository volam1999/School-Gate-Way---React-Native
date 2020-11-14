import React from "react";

import {
  Button,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";

import firebase from "../modules/Database";

export default class PusNotifications extends React.Component {
  state = {
    Title: "Cổng Thông Tin QNU",
    Body: "",
    clients: [],
  };

  retrievePushToken = () => {
    firebase
      .database()
      .ref("/accounts/")
      .on("value", (snapshot) => {
        const clients = snapshot.val();
        this.setState({ clients: Object.values(clients) });
        console.log(this.state.clients);
        this.state.clients.map((client) => {
          if ("push_token" in client) {
            this.sendPushNotification(
              this.state.Title,
              this.state.Body,
              client.push_token
            );
          }
        });
      });
  };

  sendPushNotification = (title, body, push_token) => {
    console.log("Sending Notifications");
    let response = fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: push_token,
        sound: "default",
        title: title,
        body: body,
      }),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Title of Messes"
          onChangeText={(text) => {
            this.setState({ Title: text });
          }}
        />
        <TextInput
          multiline
          numberOfLines={5}
          style={styles.textInput}
          placeholder="Body of Messes"
          onChangeText={(text) => {
            this.setState({ Body: text });
          }}
        />
        <Button
          title="Send Notifications"
          onPress={() => {
            this.retrievePushToken();
          }}
        ></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
  },
  text: {
    color: "#005662",
    fontSize: 17,
    textAlign: "center",
    //fontWeight: "bold",
    margin: 10,
  },
  image: {
    width: 180,
    height: 180,
  },
  textInput: {
    height: 48,
    width: Platform.OS == "android" ? "100%" : 480,
    color: "#005662",
    borderRadius: 5,
    marginTop: 3,
    marginLeft: 10,
    fontWeight: "bold",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: "#005662",
    padding: 5,
    marginTop: 25,
    marginLeft: 10,
    width: Platform.OS == "android" ? "100%" : 480,
    alignItems: "center",
  },
});
