import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Chat from '../Screens/Chat';
import Main from '../Screens/Main';

const tabs = createMaterialTopTabNavigator();
const TopTab = () => {
  return (
      
    <tabs.Navigator initialRouteName="Chat" tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}>
      <tabs.Screen name="Chat" component={Chat} options={{tabBarBadge: 3}}/>
      <tabs.Screen name="Menu" component={Chat} />
      <tabs.Screen name="Friends" component={Chat} />
    </tabs.Navigator>
  );
};

export default TopTab;

const styles = StyleSheet.create({});
