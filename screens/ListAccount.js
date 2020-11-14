import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ToastAndroid,
  FlatList,
  TouchableOpacity,
} from "react-native";
import firebase from "../modules/Database";

export default class ListAccount extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("accounts")
      .on("value", (snapshot) => {
        this.setState({
          dataSource: Object.values(snapshot.val()),
          isLoading: false,
        });
        console.log(this.state.dataSource);
      });
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ flex: 1, flexDirection: "row" }}
        onPress={() => {
          ToastAndroid.show(item.name, ToastAndroid.SHORT);
        }}
      >
        <Image
          style={{ width: 100, height: 100, margin: 5 }}
          source={require("../assets/itqnu.png")}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 18, color: "green", marginBottom: 5 }}>
            {item.name}
          </Text>
          <Text style={{ fontSize: 16, color: "blue" }}>{item.class}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{ height: 1, width: "100%", backgroundColor: "green" }}
      ></View>
    );
  };

  render() {
    return this.state.isLoading ? (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <ActivityIndicator size="large" color="#330066" animating />
      </View>
    ) : (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index + "TP"}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#F5FCFF",
    marginTop: 15,
  },
});
