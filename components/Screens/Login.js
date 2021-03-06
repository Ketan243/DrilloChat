import {
  Alert,
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {Component} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Default/Loader';
import {SocialIcon} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class Login extends Component {
  componentDidMount(){
    auth().onAuthStateChanged(function(user) {
      if (user==auth().currentUser) {
        console.log(user)
      }
      else{
        return null;
      }
    });
  }
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      uname: '',
      pass: '',
      uid: '',
      authenticated: false,
      position: 'bottom',
    };
  }

  writeText = text => {
    this.setState({
      uname: text,
    });
  };
  
  login = async () => {
    if (this.state.uname == '' && this.state.pass == '') {
      Alert.alert('Warning!', 'Please enter Your Details');
    }
    if (this.state.uname == '' || this.state.pass == '') {
      Alert.alert('Warning!', 'Email Or Password not found');
    } else {
      const {uname, pass} = this.state;          
      auth()
        .signInWithEmailAndPassword(uname, pass)
        .then(data => {
          if (data.user.emailVerified) {
            this.props.navigation.navigate('Home', {uname: this.state.uname});
            console.log('signed in!');
            this.textInput.current.clear();
          } else {
            Alert.alert(
              'Warning',
              'Please verify your email address before login',
            );
          }
        })
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            ToastAndroid.showWithGravityAndOffset(
              'Invalid Email',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              20,
              100,
            );
          }

          if (error.code === 'auth/wrong-password') {
            console.log('That password was incorrect');
            ToastAndroid.showWithGravityAndOffset(
              'Invalid Password',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              20,
              100,
            );
          }

          if (error.code === 'auth/user-not-found') {
            console.log('User not found');
            ToastAndroid.showWithGravityAndOffset(
              'User not found',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              20,
              100,
            );
          }
          if (error.code === 'auth/too-many-requests') {
            console.log('Too many requests found');
            ToastAndroid.showWithGravityAndOffset(
              'Too many requests found',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              20,
              100,
            );
          }
        });
    }
  };

  login() {}

  signup(navigation) {
    this.props.navigation.navigate('Signup');
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>DrilloChat - Connect With Friends</Text>
          </View>
          <View style={styles.Login}>
            <Text style={styles.loginText}>Login</Text>
            <View>
              <TextInput
                autoCorrect={true}
                autoCompleteType="email"
                type="email"
                validate="required"
                keyboardType="email-address"
                ref={this.textInput}
                style={styles.input}
                placeholder="Email"
                onChangeText={text => this.setState({uname: text})}
              />

              <TextInput
                autoCorrect={true}
                autoCompleteType="password"
                ref={this.textInput}
                style={styles.input}
                type="password"
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={text => this.setState({pass: text})}
              />
            </View>
            <View>
              <View style={styles.button}>
                <Button title="Login -->" onPress={()=>{this.login()}} />
              </View>
            </View>
            <View style={styles.ort}>
              <TouchableOpacity>
                <SocialIcon
                  style={styles.soc}
                  light
                  button
                  type="google"
                  onPress={()=>{this.login()}}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <SocialIcon style={styles.soc} button type="facebook" />
              </TouchableOpacity>
            </View>
            <View style={styles.SignupButton}>
              <Text style={styles.SignupText1}>Do you have Account?</Text>
              <TouchableOpacity onPress={this.signup.bind(this)}>
                <Text style={styles.SignupText2}>SignUp</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 100,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  Login: {
    paddingTop: 50,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    alignItems: 'center',
    height: 40,
    width: 205,
    borderBottomWidth: 2,
    margin: 10,
  },
  button: {
    marginVertical: 5,
    marginTop: 5,
    marginLeft: 5,
  },
  ort: {
    flexDirection: 'row',
  },
  soc: {
    marginVertical: 10,
    width: 50,
    height: 50,
  },
  SignupButton: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    bottom: 0,
  },
  SignupText1: {
    fontSize: 20,
    fontFamily: 'serif',
  },
  SignupText2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default Login;
