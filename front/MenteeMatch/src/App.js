import React from 'react';

import {useHistory} from 'react-router-dom';

import {NativeRouter, Route, Switch} from 'react-router-native';
import {View, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';

import UserDetails from './components/UserDetails/UserDetails';
import firstScreen from './components/firstScreen';
import store from './redux/store';
import {Matcher} from './components';
// console.log("Matcher en App: ", Matcher)
import FlashMessage from 'react-native-flash-message';
//import { storeData, getData } from './utils/storage.js'

// components
import Login from './screens';

const App = () => {
  return (
    <Provider store={store}>
      <NativeRouter>
        <View style={styles.container}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/userDetail" component={UserDetails} />
            <Route exact path="/matcher" component={Matcher} />
            <Route exact path="/" component={firstScreen} />
          </Switch>
        </View>
        <FlashMessage position="top" />
      </NativeRouter>
    </Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
});

export default App;
