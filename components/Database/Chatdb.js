import React, {Component} from 'react';
import {View, Text} from 'react-native';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

class Chatdb {
  send = messages => {
      messages.forEach(item => {
        const message = {
          text: item.text,
          timestamp: database.ServerValue.TIMESTAMP,
          user: item.user,
        };
        this.db.push(message);
      });
    };


  parse = message => {
    const {user, text, timestamp} = message.val();
    const {key: _id} = message;
    const createdAt = new Date(timestamp);
    return {
      _id,
      createdAt,
      text,
      user,
    };
  };

  get = callback =>
    this.db.on('child_added', (snapshot) => callback(this.parse(snapshot)));

  off() {
    this.db.off();
  }

  get db() {
    return database().ref('messages');
  }

  get uid() {
    return (auth().currentUser || {}).uid;
  }
}

export default Chatdb;
