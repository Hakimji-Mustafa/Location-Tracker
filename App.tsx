import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LocationPermission from './src/Components/LocationPermission';
import Navigation from './src/Navigators/Stacknavigation';
import 'react-native-gesture-handler';
import 'react-native-svg';
import 'react-native-redash';
import TargetModal from './src/Components/TargetModal';
import Testing from './src/Components/Testing';
import store from './src/Redux/Store';
import persistStore from 'redux-persist/es/persistStore';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  const persistor = persistStore(store);
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigation />
          {/* <Testing /> */}
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
