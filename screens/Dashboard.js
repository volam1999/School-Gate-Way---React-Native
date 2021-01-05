import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import firebase from "../modules/Database";

import Home from "./Home";
import Profile from "./Profile";
import ListAccounts from "./ListAccount";
import AdminFeatures from "./AdminFeatures";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

export default class Dashboard extends React.Component {
  state = {
    role: "user",
  };

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

  getRoleMenu = async () => {
    try {
      const value = await AsyncStorage.getItem("@role");
      if (value !== null) {
        // value previously stored
        console.log(value);
        this.setState({ role: value });
      }
    } catch (e) {
      // error reading value
    }
  };

  async componentDidMount() {
    await this.registerForPushNotificationsAsync();
    await this.getRoleMenu();
  }

  render() {
    if (this.state.role == "admin") {
      return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "ios-home" : "ios-home";
              } else if (route.name === "Profile") {
                iconName = focused ? "ios-person" : "ios-person";
              } else if (route.name === "Admin") {
                iconName = focused ? "ios-settings" : "ios-settings";
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
            name="Home"
            component={Home}
            options={{ tabBarBadge: 99, title: "My Home" }}
          />
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Admin" component={AdminFeatures} />
        </Tab.Navigator>
      );
    } else {
      return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "ios-home" : "ios-home";
              } else if (route.name === "Profile") {
                iconName = focused ? "ios-person" : "ios-person";
              } else if (route.name === "Admin") {
                iconName = focused ? "ios-settings" : "ios-settings";
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
            name="Home"
            component={Home}
            options={{ tabBarBadge: 99, title: "My Home" }}
          />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      );
    }
  }
}
