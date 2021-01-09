import firebase from "../modules/Database";
import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default class login extends React.Component {
  state = {
    username: "",
    password: "",
  };

  storeData = async (id, role, password) => {
    try {
      await AsyncStorage.setItem("@sessionID", id);
      await AsyncStorage.setItem("@role", role);
      await AsyncStorage.setItem("@sessionPass", password + "");
      console.log("Session: " + id + " " + role);
    } catch (error) {
      console.log(error.text);
    }
  };

  loginByFirebase = async (userId, password) => {
    console.log("Đang đăng nhập với ID:" + userId);
    firebase
      .database()
      .ref("accounts/" + userId)
      .on("value", (snapshot) => {
        // check user input password with the password in firebase
        const password1 = snapshot.val() ? snapshot.val().password : "";
        if (password == password1) {
          Alert.alert("Welcome back: " + userId);
          this.storeData(userId, snapshot.val().role, snapshot.val().password);
          this.props.navigation.reset({
            index: 0,
            routes: [{ name: "dashboard" }],
          });
        } else {
          Alert.alert("Tên đăng nhập hoặc mật khẩu không chính xác");
        }
      });
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Image style={styles.image} source={require("../assets/itqnu.png")} />
        <Text style={styles.text}>
          Cổng Thông Tin {"\n"} Trường Đại Học Quy Nhơn
        </Text>
        <TextInput
          style={styles.textInput}
          maxLength={10}
          placeholder="Tên Đăng Nhập"
          onChangeText={(text) => {
            this.setState({ username: text });
          }}
        ></TextInput>
        <TextInput
          style={styles.textInput}
          placeholder="Mật Khẩu"
          maxLength={8}
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
        ></TextInput>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.loginByFirebase(this.state.username, this.state.password);
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            Đăng Nhập
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
