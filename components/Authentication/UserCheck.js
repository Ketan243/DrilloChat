import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export default function userCheck() {
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

    GoogleSignin.configure({
      webClientId:
        '899454439175-3oi7812lithtr3ohhfgc47fhrso3tec3.apps.googleusercontent.com',
    });
    var unsubscribe = auth().onAuthStateChanged(function(user) {
      if (user==auth().currentUser) {
        console.log(user)
      }
    });
    
    unsubscribe();  
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Login />
      </View>
    );
  }

}
