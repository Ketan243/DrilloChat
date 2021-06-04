import React from 'react';
import {View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Header from '../Default/Header';


const DrawerNav = createDrawerNavigator();

const Drawer = () => {
  return (
    <DrawerNav.Navigator initialRouteName="Home">
      <DrawerNav.Screen name="Home" component={Header} />
    </DrawerNav.Navigator>
  );
};

export default Drawer;
