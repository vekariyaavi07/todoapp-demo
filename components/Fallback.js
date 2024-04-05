/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';

const Fallback = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: 30,
      }}>
      <Animatable.Image
        source={require('../assets/sketch.png')}
        style={{height: 300, width: 300}}
        animation="zoomIn"
        duration={1000}
      />
      <Animatable.Text
        style={{fontSize: 25, fontWeight: '500', color: 'black'}}
        animation="zoomIn"
        duration={1500}>
        Tracking your daily routine
      </Animatable.Text>
    </View>
  );
};

export default Fallback;

const styles = StyleSheet.create({});
