import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class HelloWorldApp extends Component {
  static navigationOptions = ({ navigation }) => {    
    return {
      title: navigation.getParam('cityData').name
    };
  };

  render() {

    const cityData = this.props.navigation.getParam('cityData');
    const weatherData = this.props.navigation.getParam('weatherData');

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>        
        <Text>Temperature {weatherData.main.temp}</Text>
        <Text>Pressure {weatherData.main.pressure}</Text>
        <Text>Wind speed {weatherData.wind.speed}</Text>
        <Text>Wind direction {weatherData.wind.deg}</Text>        
        <Text>Wind direction {weatherData.weather[0].icon}</Text>
      </View>
    );
  }
}