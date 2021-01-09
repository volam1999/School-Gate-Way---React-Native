import React from "react";
import { Alert } from "react-native";

import {
  Button,
  View,
  TextInput,
  Text,
  StyleSheet,
} from "react-native";

import firebase from "../modules/Database";

export default class PusNotifications extends React.Component {
  state = {
    Title: "Cổng Thông Tin QNU",
    Body: "",
    clients: [],
  };

  retrievePushToken = () => {
    var count = 0;
    firebase
      .database()
      .ref("/accounts/")
      .on("value", (snapshot) => {
        const clients = snapshot.val();
        this.setState({ clients: Object.values(clients) });
        console.log(this.state.clients);
        this.state.clients.map((client) => {
          if ("push_token" in client && client.push_token != "") {
            this.sendPushNotification(
              this.state.Title,
              this.state.Body,
              client.push_token
            );
            count++;
          }
        });
        Alert.alert("Đã gửi " + count + " thông báo");
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
        <View style={{ margin: 16 }}>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "gray" }}>
              THÔNG BÁO
            </Text>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Tiêu đề"
            onChangeText={(text) => {
              this.setState({ Title: text });
            }}
          />
          <TextInput
            multiline
            numberOfLines={5}
            style={{
              height: 150,
              width: "100%",
              fontSize: 15,
              color: "#005662",
              borderWidth: 1,
              marginTop: 10,
              marginBottom: 10,
              textAlignVertical: "top",
              paddingLeft: 10,
              paddingTop: 10,
            }}
            placeholder="Nội dung"
            onChangeText={(text) => {
              this.setState({ Body: text });
            }}
          />
          <Button
            style={styles.button}
            title="GỬI THÔNG BÁO"
            onPress={() => {
              this.retrievePushToken();
            }}
          ></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  textInput: {
    width: "100%",
    fontSize: 15,
    borderWidth: 1,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "#005662",
  },
});
