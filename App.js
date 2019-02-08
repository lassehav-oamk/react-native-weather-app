import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MasterView from './components/MasterView';
import DetailView from './components/DetailView';
import {createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator({
  Master: {screen: MasterView},
  Detail: {screen: DetailView},
});

const App = createAppContainer(MainNavigator);

export default App;

/*export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MasterView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
