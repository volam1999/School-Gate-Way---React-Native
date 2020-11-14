import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./screens/Home";
import Login from "./screens/Login";

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"login"}
        >
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="login" component={Login} navigation />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
