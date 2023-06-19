import {PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

const LocationPermission = () => {
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
        setTimeout(() => requestBackgroundLocationPermission(), 500);
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn('Location permission denied -->', err);
    }
  };

  const requestBackgroundLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        {
          title: 'Track background Location Permission',
          message:
            'Track background Location Permission' +
            'so yyou track your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Background Location');
        setTimeout(() => requestNotificationPermission(), 500);
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn('Location permission denied -->', err);
    }
  };

  const requestNotificationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'To send Notifications',
          message:
            'Track background Location Permission' +
            'so yyou track your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Notifications');
      } else {
        console.log('Location permission denied for notificatiopns');
      }
    } catch (err) {
      console.warn('Notification permission denied -->', err);
    }
  };
  useEffect(() => {
    requestLocationPermission();
  }, []);

  return null;
};

export default LocationPermission;

const styles = StyleSheet.create({});
