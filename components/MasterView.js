import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

export default class MasterView extends Component {
    static navigationOptions = {
        title: 'Master',
      };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>This is the master view</Text>
        <Button 
            title="Detail view"
            onPress={() => navigate('Detail', {someData: 'Yep'})} />
      </View>
    );
  }
}