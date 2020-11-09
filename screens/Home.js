import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import firebase from "../modules/Database";

import Main from "./Main";
import Profile from "./Profile";
import Admin from "./Admin";
import ListAccounts from "./ListAccount";

const Tab = createBottomTabNavigator();

export default class Home extends React.Component {
  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }

    try {
      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync();

      // POST the token to your backend server from where you can retrieve it to send push notifications.
      firebase
        .database()
        .ref("accounts/" + this.props.route.params.userId + "/push_token")
        .set(token.data);
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    await this.registerForPushNotificationsAsync();
  }

  render() {
    return (
      <NavigationContainer independent>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Main") {
                iconName = focused
                  ? "ios-information-circle"
                  : "ios-information-circle-outline";
              } else if (route.name === "Profile") {
                iconName = focused ? "ios-list-box" : "ios-list";
              } else if (route.name === "Admin") {
                iconName = focused ? "ios-list-box" : "ios-list";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen
            name="Main"
            component={Main}
            options={{ tabBarBadge: 0, title: "My Home" }}
          />
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Admin" component={ListAccounts} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
