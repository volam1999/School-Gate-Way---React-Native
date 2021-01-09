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
import { Ionicons } from "@expo/vector-icons";

import ListAccounts from "./ListAccount";
import PushNotifications from "./PushNotifications";
import { SafeAreaView } from "react-native";

const AdminHome = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: "#009688",
        }}
      >
        <MarqueeText
          style={{
            fontSize: 16,
            width: 400,
            color: "#fff",
          }}
          duration={24000}
          marqueeOnStart
          loop
        >
          Thông báo mới: Trường Đại học Quy Nhơn với giải thưởng “Công trình
          toán học năm 2020”, Trường Đại học Quy Nhơn: Bổ nhiệm 02 tân Phó Hiệu
          trưởng nhiệm kỳ 2020-2025, Bế mạc đợt khảo sát chính thức phục vụ đánh
          giá ngoài 05 chương trình đào tạo, Khai mạc đợt khảo sát chính thức
          phục vụ đánh giá ngoài 05 chương trình đào tạo
        </MarqueeText>
      </View>
      <View
        style={{
          margin: 16,
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("ListAccounts");
          }}
        >
          <Ionicons name="md-list-box" size={24} color="#fff" />
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "bold",
              paddingLeft: 5,
            }}
          >
            Danh Sách Người Dùng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("PushNotifications");
          }}
        >
          <Ionicons name="ios-notifications" size={24} color="#fff" />
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "bold",
              paddingLeft: 5,
            }}
          >
            Gửi thông báo
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  text: {
    color: "#005662",
    fontSize: 50,
    textAlign: "center",
    fontWeight: "bold",
    margin: 10,
  },
});
