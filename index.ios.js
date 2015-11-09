/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import Cycle from '@cycle/core';
import {makeReactNativeDriver} from '@cycle/react-native';
import Rx from 'rx';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;


function main ({RN}) {
  var count$ = RN.select('button').events('press')
    .startWith(0)
    .scan((total, _) => total + 1);

  return {
    RN: count$.map(count => (
      <View style={styles.container}>
        <Text style={styles.welcome} selector="button">Wow such react native cycle {count}</Text>
      </View>
    ))
  };
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

Cycle.run(main, {
  RN: makeReactNativeDriver('MindYourBreath')
});
