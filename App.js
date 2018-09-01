import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import Weather from "./Weather";

const API_KEY = "29dd75c3ff68c07aaa2e116512ba3a2b";

export default class App extends Component {
  state = {
    isLoaded: false,
    error: null,
    temp: null,
    name: null
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: error
        });
      }
    );
  }

  _getWeather = (lat, lon) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          temp: json.main.temp,
          name: json.weather[0].main,
          isLoaded: true
        });
        console.log(this.state.name +"/"+this.state.temp)

      });
  };

  render() {
    const { isLoaded, temp , name  } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {isLoaded ? (
          <Weather temp={ Math.floor(temp) } weatherName={name} />
        ) : (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Getting the weather</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loading: {
    flex: 1,
    backgroundColor: "#FDF6A4",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  loadingText: {
    fontSize: 30,
    marginBottom: 100
  }
});
