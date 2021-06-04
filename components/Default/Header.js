import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';

export default class Header extends Component {
  menu(navigation) {
    this.props.navigation.openDrawer();
  }

  logout(navigation) {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    this.props.navigation.navigate('Login');
  }
  render() {
    return (
      <View style={styles.Header}>
        <Text style={styles.headerTitle}>Drillo Chat </Text>
        <Button
          title="Logout"
          type="outline"
          titleStyle={{color: 'white'}}
          buttonStyle={{borderColor: 'white'}}
          onPress={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    backgroundColor: 'black',
    height: '100%',
    justifyContent: 'space-between',
    paddingTop: 10,
    padding: 5,
  },

  icon: {
    color: 'white',
    position: 'absolute',
    left: 10,
    top: 6,
  },

  headerTitle: {
    //marginLeft: '30%',
    color: 'white',
    fontSize: 25,
    fontFamily: 'monospace',
  },
});
