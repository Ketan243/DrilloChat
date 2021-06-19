import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Button} from 'react-native-elements';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

export default class Header extends Component {
  
  logout(navigation) {
      auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    this.props.navigation.navigate('Login');
    
  }

  render() {
    return (
      <View style={styles.Header}>
        <Text style={styles.headerTitle}>DrilloChat </Text>
        <Button
          title="Logout"
          type="outline"
          titleStyle={{color: 'white'}}
          buttonStyle={{borderColor: 'white'}}
          onPress={this.logout.bind(this)}
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
    color: 'white',
    fontSize: 25,
    fontFamily: 'monospace',
  },
});
