import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  BackHandler,
} from "react-native";
import React from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "../modules/Database";

export default class Profile extends React.Component {
  state = {
    name: "",
    studentID: "",
    phone: "",
    email: "",
    address: "",
    class: "",
    university: "ĐẠI HỌC QUY NHƠN",
  };

  retrieveData = async () => {
    var id = "";

    try {
      const value = await AsyncStorage.getItem("@sessionID");
      if (value !== null) {
        // value previously stored
        id = value;
      }
    } catch (e) {
      // error reading value
    }

    var ref = "/accounts/" + id + "/";
    console.log(ref);
    firebase
      .database()
      .ref(ref)
      .on("value", (snapshot) => {
        const client = snapshot.val();
        console.log(client);
        this.setState({
          name: client.name,
          studentID: id,
          class: client.class,
          phone: client.phone,
          address: client.place,
          email: client.email,
        });
      });
  };

  componentDidMount = () => {
    this.retrieveData();
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{ alignItems: "center", marginTop: 32 }}>
          <Image
            style={styles.imageStyle}
            source={require("../assets/2.jpeg")}
          />
        </View>
        <View style={{ margin: 16 }}>
          <Text style={styles.Label}>{this.state.name}</Text>
          <Text style={styles.text}>
            Mã Số Sinh Viên:{" "}
            <Text style={{ fontWeight: "bold" }}>{this.state.studentID}</Text>
          </Text>
          <Text style={styles.text}>
            Số Điện Thoại:{" "}
            <Text style={{ fontWeight: "bold" }}>{this.state.phone}</Text>
          </Text>
          <Text style={styles.text}>
            Địa Chỉ Email:{" "}
            <Text style={{ fontWeight: "bold" }}>{this.state.email}</Text>
          </Text>
          <Text style={styles.text}>
            Quê Quán:{" "}
            <Text style={{ fontWeight: "bold" }}>{this.state.address}</Text>
          </Text>
          <Text style={styles.text}>
            Khóa: <Text style={{ fontWeight: "bold" }}>{this.state.class}</Text>
          </Text>
          <Text style={styles.text}>
            Hệ: <Text style={{ fontWeight: "bold" }}>Đại học chính quy</Text>
          </Text>
          <Text style={styles.text}>
            Trường:{" "}
            <Text style={{ fontWeight: "bold" }}>{this.state.university}</Text>
          </Text>
          <View style={{ marginTop: 5 }}>
            <Button
              title="Đổi mật khẩu"
              onPress={() => {
                this.props.navigation.navigate("ChangePassword");
              }}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Button
              title="Đăng xuất"
              onPress={() => {
                BackHandler.exitApp();
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    backgroundColor: "#fff",
  },
  imageStyle: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },

  Label: {
    color: "#005662",
    fontSize: 17,
    textAlign: "center",
    fontWeight: "bold",
    margin: 5,
    textTransform: "uppercase",
  },
  text: {
    fontSize: 16,
  },
  button: {
    color: "green",
    margin: 16,
  },
});
