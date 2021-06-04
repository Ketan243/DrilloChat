import * as firebase from '@react-native-firebase/app'
import io.invertase.firebase.RNFirebasePackage;

GoogleSignin.configure({
      webClientId:
        '899454439175-3oi7812lithtr3ohhfgc47fhrso3tec3.apps.googleusercontent.com',
    });

var firebaseConfig = {
    apiKey: "AIzaSyAwZ_L_yGjomODMjppUOUek69_Ct6bXloE",
    authDomain: "drillochat.firebaseapp.com",
    databaseURL: "https://drillochat.firebaseio.com",
    projectId: "drillochat",
    storageBucket: "drillochat.appspot.com",
    messagingSenderId: "899454439175",
    appId: "1:899454439175:web:20cde58a8a1ab909d6ffa2",
    measurementId: "G-Z5H58JQJWH"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const db = app.database();
