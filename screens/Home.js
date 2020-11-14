import React from "react";
import WebView from "react-native-webview";

export default class Main extends React.Component {
  render() {
    return (
      <WebView
        style={{ marginTop: 21 }}
        source={{ uri: "http://qnu.edu.vn/" }}
      />
    );
  }
}
