import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import AutoComplete from 'react-native-autocomplete-input';
import api from '../dataRequests';
const cityData = require('../data/small.city.list.json');
import WeatherTeaser from './WeatherTeaser';
import lodash from 'lodash';

export default class MasterView extends Component {
    static navigationOptions = {
        title: 'Master',
    };
    constructor(props)
    {
        super(props);
        this.state = {
            autoCompleteInput: "",
            savedCities: []
        };
    }

    filterAutoCompleteItems(inputText)
    {
        if(this.state.autoCompleteInput.length < 1)
        {
            return [];
        }
        return cityData
            .filter(city => city.name.startsWith(inputText));
    }

    saveCity(cityAndWeatherData)
    {
        let savedCities = [];
        if(this.state.savedCities.find(element => element.cityData.id === cityAndWeatherData.cityData.id) == undefined)
        {
            savedCities = lodash.cloneDeep(this.state.savedCities);            
            savedCities.unshift(cityAndWeatherData);
            /*localForage.setItem(cityAndWeatherData.cityData.id.toString(), cityAndWeatherData).then(function () {
                console.log("item added to database")
              }).catch(function (err) {
                // we got an error
                console.log("db error");
              });*/
            this.setState({ savedCities });
        }
        else
        {        
            return;
        }        
    }


    autoCompleteSelectCity(cityData)
    {
        this.setState({
            autoCompleteInput: ""
        });
        api.getCityWeather(cityData.id).then(weatherData => {            
            this.saveCity({
                cityData,
                weatherData                
            });
        })
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
        <View style={{ 
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: "#DDDDFF" 
            }}>
            <View style={{ 
                width: "100%",
                zIndex: 1,
                left: 0,
                position: 'absolute',
                right: 0,
                top: 0,                
                }}>
            
                <AutoComplete
                    data={this.filterAutoCompleteItems(this.state.autoCompleteInput)}                    
                    onChangeText={text => this.setState({ autoCompleteInput: text })}
                    renderItem={city => (
                        <TouchableOpacity onPress={() => this.autoCompleteSelectCity(city)}>
                            <View style={{  backgroundColor: "#BBBBBB",
                                            paddingTop: 5,
                                            paddingBottom: 5
                                        }}>
                                <Text>{city.name + ", " + city.country}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View style={{paddingTop: 40, width: "100%", flex: 1, flexDirection: "column", }}>
                {
                    this.state.savedCities.map((city, index) => {
                        return <WeatherTeaser key={index} data={city} onPress={() => navigate('Detail', { cityData: city.cityData, weatherData: city.weatherData })} />
                    })
                }
            </View>
            <Button 
                title="Detail view"
                onPress={() => navigate('Detail', {someData: 'Yep'})} />
        </View>
        );
    }
}