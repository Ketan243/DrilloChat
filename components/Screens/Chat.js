import {Avatar, Badge, Icon, ListItem} from 'react-native-elements';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';

import Main from './Main';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      name: '',
      friend_id: '',
    };
  }

  componentDidMount() {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        const items = [];
        database()
          .ref('/users/')
          .on('value', snapshot => {
            var id = 1;
            snapshot.forEach(child => {
              const uid = child.val().uid;
              JSON.parse(
                items.push({
                  name: child.val().name,
                  email: child.val().email,
                  uid: child.val().uid,
                  key: id++,
                }),
              );

              if (uid === (auth().currentUser || {}).uid) {
                var UID = items.pop(uid);
              }
              this.setState({
                username: items,
              });
            });
          });
      }
    });
    return subscriber;
  }

  componentWillUnmount() {
    var unsubscribe = auth().onAuthStateChanged(function(user) {
      if (user == auth().currentUser) {
      }
    });

    unsubscribe();
  }

  chatting(navigation) {
    this.props.navigation.navigate('Main', {id: this.state.username[0]});
  }

  render() {
    return (
      <View style={styles.chatContainer}>
        <FlatList
          style={styles.list}
          data={this.state.username}
          key={this.key}
          renderItem={({item}) => (
            <TouchableOpacity onPress={this.chatting.bind(this)}>
              <View style={styles.chatList}>
                <TouchableOpacity
                  key={item.key}
                  style={styles.container}
                  onPress={this.chatting.bind(this)}>
                  <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

export default Chat;

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    padding: 5,
  },

  uname: {
    fontSize: 18,
    fontWeight: '700',
  },
  chatList: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: 'white',
    height: 70,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    padding: 5,
    marginVertical: 10,
  },
});
