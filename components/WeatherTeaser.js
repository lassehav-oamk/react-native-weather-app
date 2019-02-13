import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';


const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: 60,
        alignItems: "center",        
        padding: 5,
        borderWidth: 1,
        marginBottom: 5

    },
    
  });

export default class WeatherTeaser extends PureComponent {
    render() {
        return this.props.data == null ? null :
            (
                <TouchableOpacity onPress={this.props.onPress}>
                <View style={styles.main}>
                    
                        <Text>{this.props.data.cityData.name}, {this.props.data.weatherData.main.temp}&#8451;</Text>                        
                    
                </View>
                </TouchableOpacity >
            );
    }
}

