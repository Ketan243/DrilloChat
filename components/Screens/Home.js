import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../Default/Header';
import Chat from './Chat';
import TopTab from '../Navigation/TopTab';

export default class Home extends Component {
  menu(navigation) {
    this.props.navigation.openDrawer();
  }

  
  render() {
    return (
      <>
        <View style={styles.header}>
          <Header />
        </View>

        <View style={styles.container}>
          <TopTab />
        </View>
        {/*<View style={styles.Header}>
                <MaterialIcon name='menu' size={38} style={styles.icon} onPress={this.menu.bind(this)} />
                <Text style={styles.headerTitle}>Drillo Chat  </Text>
                <Button title='Logout' type="outline" titleStyle={styles.title} buttonStyle={styles.button} onPress={this.logout.bind(this)}></Button>
    </View> */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: '10%',
  },
  container: {
    flex: 1,
  },
});
