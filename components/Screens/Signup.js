import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  ToastAndroid,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {SocialIcon} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      username: '',
      uname: '',
      pass: '',
      authenticated: 'false',
    };
  }

  signup() {
    if (this.state.textInput != this.state.textInput) {
      Alert.alert('Password not matched');
    } else {
      const {uname, pass} = this.state;
      auth()
        .createUserWithEmailAndPassword(uname, pass)
        .then(() => {
          Alert.alert('Alert Title', 'User Added Successfully');
          ToastAndroid.showWithGravityAndOffset(
            'User Added Successfully',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            20,
            100,
          );

          console.log('User Registered');
          database()
            .ref('/users/')
            .push({
              uid: (auth().currentUser || {}).uid,
              name: this.state.username,
              email: this.state.uname,
            });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            ToastAndroid.showWithGravityAndOffset(
              'User Already Exist',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              20,
              100,
            );
          }

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

          if (error.code === 'auth/weak-password') {
            Alert.alert('Warninig!', 'Your Password is weak');
          }
        });
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
            <Text style={styles.header}>DrilloChat - Connect With Friends</Text>
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
                onChangeText={password => this.setState({pass: password})}
                secureTextEntry={true}
              />

              <TextInput
                style={styles.input}
                type="password"
                placeholder="Confirm Password"
                onChangeText={password => this.setState({pass: password})}
                secureTextEntry={true}
              />
            </View>
            <View>
              <View style={styles.button}>
                <Button title="SignUp" onPress={this.signup.bind(this)} />
              </View>

              <TouchableOpacity>
                <SocialIcon
                  style={styles.soc}
                  title="Sign Up"
                  button
                  type="facebook"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <SocialIcon
                  style={styles.soc}
                  title="Sign Up"
                  button
                  type="google"
                />
              </TouchableOpacity>
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
