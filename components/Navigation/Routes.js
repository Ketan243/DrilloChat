import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Header from '../Default/Header';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import Main from '../Screens/Main';
import Home from '../Screens/Home';

const Stack = createStackNavigator();
const DrawerNav = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} options={{title: 'Login'}} />
      {/*<Stack.Screen
        name="Header"
        component={DrawerNavigation}
        options={({ navigation }) => ({
          title: "React Navigation",
          headerLeft: () =>
            <Icon
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={[{ color: 'white', marginLeft: 10 }]}
              size={24}
              name={ 'menu'}
            />
        })
      }
      />*/}
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{title: 'Signup'}}
    />
      
      <Stack.Screen name="Main" component={Main} options={{title: 'Main'}} />
      <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
    </Stack.Navigator>
  );
}



Toptab = () => {
  <Tab.Navigator>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Chat" component={Chat} />
  </Tab.Navigator>;
};
export default function Routes() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
