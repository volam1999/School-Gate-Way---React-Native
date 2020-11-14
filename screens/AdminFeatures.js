import React from "react";
import {
  Button,
  View,
  Text,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import MarqueeText from "react-native-marquee";

import ListAccounts from "./ListAccount";
import PushNotifications from "./PushNotifications";

const AdminHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MarqueeText
        style={{ fontSize: 24, width: 400 }}
        duration={8000}
        marqueeOnStart
        loop
      >
        Trường Đại học Quy Nhơn với giải thưởng “Công trình toán học năm 2020”
      </MarqueeText>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("ListAccounts");
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
          Danh Sách Người Dùng
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("PushNotifications");
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
          Đăng Thông Báo
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Stack = createStackNavigator();

export default class AdminFeatures extends React.Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="AdminHome"
      >
        <Stack.Screen name="AdminHome" component={AdminHome} navigation />
        <Stack.Screen name="ListAccounts" component={ListAccounts} />
        <Stack.Screen name="PushNotifications" component={PushNotifications} />
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#3A59FF",
    color: "white",
    width: Platform.OS == "android" ? "100%" : 480,
    borderRadius: 25,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 27,
    padding: "1%",
    alignItems: "center",
    marginTop: "1%",
  },
  text: {
    color: "#005662",
    fontSize: "450%",
    textAlign: "center",
    fontWeight: "bold",
    margin: 10,
  },
});
