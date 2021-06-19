import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './components/Screens/Home';
import Loader from './components/Default/Loader';
import Routes from './components/Navigation/Routes';
import auth from '@react-native-firebase/auth';

const App = () => {
   // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount

    var unsubscribe = auth().onAuthStateChanged(function(user) {
      if (user==auth().currentUser) {
        return true;
      }
    });
    
    unsubscribe();
    
  }, []);

  if (initializing){
    setTimeout(() => {
      initializing
    }, 2000);
     return <Loader/>
  };
  
 
  return (
   
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" barsStyle="light-content" />
        <Routes />
      </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
});

export default App;
