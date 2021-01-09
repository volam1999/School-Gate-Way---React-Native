import React from "react";
import { Platform, StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import Profile from "./Profile";
import ChangePassword from "./ChangePassword";

const Stack = createStackNavigator();

export default class AdminFeatures extends React.Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Profile"
      >
        <Stack.Screen name="Profile" component={Profile} navigation />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          navigation
        />
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
    backgroundColor: "#3A59FF",
    color: "white",
    width: Platform.OS == "android" ? "100%" : 480,
    borderRadius: 20,
    alignItems: "center",
    marginTop: "1%",
  },
  text: {
    color: "#005662",
    fontSize: 50,
    textAlign: "center",
    fontWeight: "bold",
    margin: 10,
  },
});
