import React from "react";
import { Text, View, Button, StyleSheet, TextInput, Alert } from "react-native";
import firebase from "../modules/Database";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class ChangePassword extends React.Component {
  state = {
    oldPass: "",
    newPass1: "",
    newPass2: "",
  };

  changePassword = async () => {
    if (
      this.state.oldPass == "" ||
      this.state.newPass1 == "" ||
      this.state.newPass2 == ""
    ) {
      Alert.alert("Xin vui lòng nhập hết các trường");
      return false;
    }

    var oldPassFirebase = "";
    var userID = "";
    try {
      oldPassFirebase = await AsyncStorage.getItem("@sessionPass");
      userID = await AsyncStorage.getItem("@sessionID");
      Alert.alert(userID + "");
    } catch (e) {
      // error reading value
      Alert.alert("lỗi đọc session");
      console.log(e);
      return false;
    }

    console.log(oldPassFirebase);
    if (oldPassFirebase != this.state.oldPass) {
      Alert.alert("Sai mật khẩu cũ");
    } else {
      if (this.state.newPass1 != this.state.newPass2) {
        Alert.alert("Hai mật khẩu mới không khớp...");
      } else {
        try {
          firebase
            .database()
            .ref("accounts/" + userID + "/password")
            .set(this.state.newPass1);
          Alert.alert("Đổi mật khẩu thành công");
          this.props.navigation.navigate("Profile");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Đổi Mật Khẩu</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          maxLength={8}
          onChangeText={(oldPass) => {
            this.setState({ oldPass });
          }}
          placeholder="Mật khẩu cũ"
        ></TextInput>
        <TextInput
          style={styles.input}
          secureTextEntry
          maxLength={8}
          onChangeText={(newPass1) => {
            this.setState({ newPass1 });
          }}
          placeholder="Mật khẩu mới"
        ></TextInput>
        <TextInput
          style={styles.input}
          secureTextEntry
          maxLength={8}
          onChangeText={(newPass2) => {
            this.setState({ newPass2 });
          }}
          placeholder="Mật lại mật khẩu mới"
        ></TextInput>
        <View style={styles.fixToText}>
          <View style={{ marginRight: 10 }}>
            <Button
              title="Hủy"
              color="orange"
              onPress={() => this.props.navigation.navigate("Profile")}
            />
          </View>

          <View>
            <Button title="Xác nhận" onPress={() => this.changePassword()} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 16,
  },
  label: {
    fontSize: 24,
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
  },
  fixToText: {
    marginTop: 5,
    flexDirection: "row",
    alignSelf: "flex-end",
  },
});
