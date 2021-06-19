import {Linking, Platform} from 'react-native';
import React, {Component} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Default/Header';
import Home from '../Screens/Home';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../Default/Loader';
import Login from '../Screens/Login';
import Main from '../Screens/Main';
import {NavigationContainer} from '@react-navigation/native';
import Signup from '../Screens/Signup';
import auth from '@react-native-firebase/auth';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();


const PERSISTENCE_KEY = 'NAVIGATION_STATE';

function MyStack() {
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return <Loader/>;
  }
  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={state =>
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      }>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{title: 'Signup'}}
        />

        <Stack.Screen name="Main" component={Main} options={{title: 'Main'}} />
        <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
        <Stack.Screen
          name="Loader"
          component={Loader}
          options={{title: 'Loader'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

Toptab = () => {
  <Tab.Navigator>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Chat" component={Chat} />
  </Tab.Navigator>;
};
export default function Routes() {
  return <MyStack />;
}
