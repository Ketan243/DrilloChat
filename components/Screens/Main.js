import {
  Button,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {Component} from 'react';

import Chatdb from '../Database/Chatdb';
import {GiftedChat} from 'react-native-gifted-chat';
import Header from '../Default/Header';
import auth from '@react-native-firebase/auth';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.route.params.id,
      friendId: props.route.params.uid,
      messages: [],
    };
  }

  get user() {
    var mychat = new Chatdb();
    return {
      _id: mychat.uid,
      userId: this.state.id,
      friendId: this.state.friendId,
    };
  }

  componentDidMount() {
    var mychat = new Chatdb();
    mychat.get(message =>
      this.setState(previous => ({
        messages: GiftedChat.append(previous.messages, message),
      })),
    );
  }

  componentWillUnmount() {
    var mychat = new Chatdb();
    mychat.off();
  }

  render() {
    var mychat = new Chatdb();

    const chat = (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.title}>Drillo Chat</Text>
        </View>
        <GiftedChat
          messages={this.state.messages}
          onSend={mychat.send}
          user={this.user}
        />
      </View>
    );

    if (Platform.OS === 'android') {
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior="padding"
        keyboardVerticalOffset={35}
        enabled>
        {chat}
      </KeyboardAvoidingView>;
    }

    return <SafeAreaView style={{flex: 1}}>{chat}</SafeAreaView>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    padding: 5,
    backgroundColor: '#429ED4',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: 24,
    color: '#260949',
    fontStyle: 'italic',
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
  header: {
    height: '10%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
});
export default Main;
