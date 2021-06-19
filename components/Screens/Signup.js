import {
  Alert,
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {Component} from 'react';

import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import {SocialIcon} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

class Signup extends Component {
  constructor(props) {
    
    super(props);
    this.textInput = React.createRef();
    this.state = {
      username: '',
      uname: '',
      pass: '',
      cpass: '',
      password: '',
      authenticated: 'false',
    };
  }
  onChange = password => this.setState({ password })
 //Changes to this file
  signup() {
        const {uname, pass} = this.state;
        try {
          auth()
            .createUserWithEmailAndPassword(uname, pass)
            .then(data => {
              data.user.sendEmailVerification();
              if (data.user.emailVerified) {
                console.log('Verified');
              } else {
                console.log('Not Verified');
              }

              Alert.alert(
                'Alert Title',
                'Signup Complete Verify email adress to login',
              );
              database()
                .ref('/users/')
                .push({
                  uid: (auth().currentUser || {}).uid,
                  name: this.state.username,
                  email: this.state.uname,
                });
              this.props.navigation.navigate('Login');
            })

            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                Alert.alert(
                  'Already a user',
                  'Enter login details to proceed',
                );
              }

              if (error.code === 'auth/invalid-email') {
                Alert.alert(
                  'Invalid Email',
                  'Enter valid email address',
                );
              }
              if (error.code === 'auth/weak-password') {
                Alert.alert('Warning!', 'Your Password is weak');
              }
            });
        } catch (error) {
          console.log(error);
        }
    
  }
  goBack(navigation) {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.container1}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>
              DrilloChat - Connect With Friends
            </Text>
          </View>
          <View style={styles.Signup}>
            <Text style={styles.loginText}>SignUp</Text>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={text => this.setState({username: text})}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={text => this.setState({uname: text})}
              />

              <TextInput
                ref={this.textInput}
                style={styles.input}
                type="password"
                placeholder="Enter Password"
                onChangeText={this.onChange}
                secureTextEntry={true}
              />
              <BarPasswordStrengthDisplay width={50} style={styles.input} password={this.state.password}/>

              <TextInput
                style={styles.input}
                type="password"
                placeholder="Confirm Password"
                onChangeText={this.onChange}
                secureTextEntry={true}
              />
            </View>
            <View>
              <View style={styles.button}>
                <Button title="SignUp" onPress={this.signup.bind(this)} />
              </View>
            </View>
            <View style={styles.SignupButton}>
              <Text style={styles.SignupText1}>Already a member?</Text>
              <TouchableOpacity onPress={this.goBack.bind(this)}>
                <Text style={styles.SignupText2}>SignIn</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container1: {
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
  Signup: {
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
  soc: {
    marginVertical: 5,
    width: 200,
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

export default Signup;
