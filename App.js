import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import Routes from './components/Navigation/Routes';
import Home from './components/Screens/Home';
const App = () => {
  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor="black" barsStyle="light-content" />  
      <Routes/>
    </View>
    
  );
};

const styles = StyleSheet.create({
  Container: {
   flex:1
  },
});

export default App;
