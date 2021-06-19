import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Chat from './Chat';
import Header from '../Default/Header';
import TopTab from '../Navigation/TopTab';
import auth from '@react-native-firebase/auth';

export default class Home extends Component {
  
  render() {
    return (
      <>
        <View style={styles.header}>
          <Header navigation={this.props.navigation} />
        </View>

        <View style={styles.container}>
          <TopTab />
        </View>
      
      </>
    );
  }
  
  componentWillUnmount() {
    var unsubscribe = auth().onAuthStateChanged(function(user) {
      if (user==auth().currentUser) {
        console.log(user)
      }
    });
    
    unsubscribe();
  }
}

const styles = StyleSheet.create({
  header: {
    height: '10%',
  },
  container: {
    flex: 1,
  },
});
