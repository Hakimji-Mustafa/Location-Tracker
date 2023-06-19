import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LocationPermission from './src/Components/LocationPermission';
import LocationTracker from './src/Components/LocationTracker';
import Navigation from './src/Navigators/Stacknavigation';
import BackTimer from './src/Components/Backtimer';

const App = () => {
  return (
    <>
      <LocationPermission />
      <Navigation />
      {/* <BackTimer /> */}
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
