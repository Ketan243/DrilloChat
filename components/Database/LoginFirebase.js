import React, { Component } from 'react'
import { Text, View } from 'react-native'
import auth from '@react-native-firebase/auth'

export class LoginFirebase extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             email:'',
             pass:''
        }
    }
    
    addUser(usrname,pass) {
      auth()
  .createUserWithEmailAndPassword(usrname, pass)
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
    }
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}

export default LoginFirebase
