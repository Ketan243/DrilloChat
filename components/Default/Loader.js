import {ActivityIndicator, Text, ToastAndroid, View} from 'react-native';
import React, {Component, useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

export default class loader extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="black" />
      </View>
    )
  }
  
}
