import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';

let moment = require('moment');


const styles = StyleSheet.create({
    main: {
        flexDirection: "column",
        width: "50%",
        padding: 5
    },
    marginBox: {
        //border: "1px solid gray",
        textAlign: "center",
        paddingTop: 20,
        paddingBottom: 20,
        width: "100%",
      //  boxShadow: "1px 1px 2px 0px #bcbcbc"
    },
    tempLabel:
    {
        fontSize: 30        
    },
    tempValue:
    {    
        fontSize: 26
    },
    tempTimeStamp:
    {
        fontSize: 12
    }
  });

export default class WeatherTeaser extends PureComponent {
    render() {

        //const time = moment.unix(this.props.data.weatherData.dt).format('D.M.YYYY HH:mm:ss');
        const time = 0;

        /*
        <View style={styles.tempValue}>
                            <Text>
                                {this.props.data.weatherData.main.temp} &#8451;
                            </Text>
                        </View>  
        */
        return this.props.data == null ? null :
            (
                <View style={styles.main} onClick={() => { this.props.update(this.props.data) }}>
                    <View style={styles.marginBox}>
                        <View style={styles.tempLabel}>
                            <Text>
                                {this.props.data.cityData.name}, {this.props.data.cityData.country}
                            </Text>
                        </View>
                                                  
                        <View style={styles.tempTimeStamp}>
                            <Text>
                                {time}
                            </Text>
                        </View>
                    </View>                    
                </View>
            );
    }
}

