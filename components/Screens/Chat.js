import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ListItem, Badge, Avatar, Icon} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Main from './Main';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      name : ''
    };
   
  }

  componentDidMount() {
    //console.log((auth().currentUser || {}).uid);

    auth().onAuthStateChanged(user => {
      if (user) {
        database()
          .ref('/users/')
          .on('value', snapshot => {
            var items = [];
            var id = 1;
            snapshot.forEach(child => {
              let uid = child.val().uid
              JSON.parse(
                items.push({
                  name: child.val().name,
                  email: child.val().email,
                  uid: child.val().uid,
                  key: id++,
                }),
              );
              if(uid ===(auth().currentUser || {}).uid){
                items.pop(uid)
              }
            });
            
            this.setState({
              username: items,
            });

            //console.log('username', this.state.username);
          });
        //console.log('User email: ', user.email);
      }
    });
    const key = this.state.username['key'];
  }

  chatting(navigation) {
    var item = this.state.username;

    const uid = (auth().currentUser || {}).uid;
   
    // console.log(uid)
    var id = [];
    item.forEach(element => {
      if(item.email == element.email){
        id.push(element.email);
      }
      

      console.log(id)
    });
    this.props.navigation.navigate('Main', {id: id});
    //console.log(id)
    //console.log(this.myRef);
  }


  render() {
    return (
      <View style={styles.chatContainer}>
        
        <FlatList
          style={styles.list}
          data={this.state.username}
          key={this.key}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={this.chatting.bind(this)}>
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
