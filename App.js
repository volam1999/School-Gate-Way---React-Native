import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./screens/Home";
import Login from "./screens/Login";

const RootStack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"login"}
        >
          <RootStack.Screen name="home" component={Home} />
          <RootStack.Screen name="login" component={Login} navigation />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}
