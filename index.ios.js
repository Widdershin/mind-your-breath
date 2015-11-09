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
  TouchableOpacity,
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
      <TouchableOpacity style={dynamicStyles.orb} activeOpacity={0.9} selector="button"></TouchableOpacity>
    </View>
  );
}


function main ({RN}) {
  var press$ = RN.select('button').events('pressIn');
  var release$ = RN.select('button').events('pressOut');

  var pressed$ = Rx.Observable.merge(
    press$.map(_ => true),
    release$.map(_ => false)
  ).startWith(false);

  var rate = 0.2;

  var change$ = Rx.Observable.merge(
    press$.map(_ => +rate),
    release$.map(_ => -rate)
  ).startWith(0);

  var count$ = Rx.Observable.interval(1000 / 60)
    .startWith(0)
    .withLatestFrom(change$, (_, change) => change)
    .scan((total, change) => total + change);

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
