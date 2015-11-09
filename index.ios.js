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

function view (count) {
  var dynamicStyles = StyleSheet.create({
    orb: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      backgroundColor: '#663399',
      height: 200 + count * 10,
      width: 200 + count * 10,
      borderRadius: 100 + count * 5
    }
  })

  return (
    <View style={styles.container}>
      <Text style={dynamicStyles.orb} selector="button"></Text>
    </View>
  );
}


function main ({RN}) {
  var count$ = RN.select('button').events('press')
    .startWith(0)
    .scan((total, _) => total + 1);

  return {
    RN: count$.map(view)
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
    backgroundColor: '#663399',
    height: 200,
    width: 200,
    borderRadius: 100
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
