import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import firebase from 'firebase';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './src/reducers';
import RouterMenu from './src/pages/Route';

export default class App extends Component {

  componentDidMount(){
    const firebaseConfig = {
      apiKey: "AIzaSyBQ64cS9P9TPtKZzCl5kcR0GwhLY5W_wwo",
      authDomain: "feedinstagram-c042a.firebaseapp.com",
      projectId: "feedinstagram-c042a",
      storageBucket: "feedinstagram-c042a.appspot.com",
      messagingSenderId: "992696896127",
      appId: "1:992696896127:web:06302b9e9d9606bdf6cd4a"
    };
      // Verifico se ja existe uma instância do firebase ativa, caso contrário, inicilizo uma passando pela condição.
      if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig)
    }
  }

  render() {
    return (
      <View style={style.container}>
        <NavigationContainer>
          <Provider store={createStore(reducer, {}, applyMiddleware(ReduxThunk))}>
            <RouterMenu />
          </Provider>
        </NavigationContainer>
      </View>
    );
  }
}

const style = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: '#fff' 
    }
  }
)