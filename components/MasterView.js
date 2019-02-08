import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
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
        if(this.state.autoCompleteInput.length < 3)
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
        //api.getCityWeather(cityData.id).then(weatherData => {            
            this.saveCity({
                cityData,
               // weatherData                
            });
        //})
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
        <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
            <View style={{ width: "100%", zIndex: 1}}>
                <AutoComplete
                    data={this.filterAutoCompleteItems(this.state.autoCompleteInput)}
                    //defaultValue={query}
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
            <View>
                {
                    this.state.savedCities.map(city => {
                        return <WeatherTeaser key={city.cityData.id} data={city} update={this.updateCityWeather}/>
                })}  
            </View>
            <Button 
                title="Detail view"
                onPress={() => navigate('Detail', {someData: 'Yep'})} />
        </View>
        );
    }
}