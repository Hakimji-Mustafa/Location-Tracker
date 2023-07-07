



import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    AppState,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import Geolocation from 'react-native-geolocation-service';
  import BackgroundService from 'react-native-background-actions';
  
  const LocationTracker = () => {
    // Background Service Function which will run in background.
  
    // Current Location State.
    const [startLatLong, setStartLatLong] = useState({
      latitude: 0,
      longitude: 0,
    });
    // Get Current Location Function.
    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(position => {
        const {latitude, longitude} = position.coords;
        setStartLatLong({
          latitude,
          longitude,
        });
      });
    };
  
    // Watch Location Variables
    const [endLatLon, setEndLatLon] = useState({
      latitude: 0,
      longitude: 0,
    });
  
    // Wathc Location Functions Success
    const success = position => {
      console.log(
        'Watcher Function called',
        'Points --> ',
        points,
        'distance -->',
        newDistance.toFixed(3),
      );
      const {latitude, longitude} = position.coords;
      console.log(
        'Current location Lat Long -->',
        startLatLong.latitude,
        startLatLong.longitude,
      );
      console.log('new lat and long from watch -->', latitude, longitude);
      setEndLatLon({
        latitude,
        longitude,
      });
      const newDistanceVar = calculateDistance(
        startLatLong.latitude,
        startLatLong.longitude,
        latitude,
        longitude,
      );
      console.log('NewDistVar -- >', newDistanceVar);
      setNewDistance(newDistanceVar);
      if (newDistanceVar >= 0.001) {
        console.log(
          '00--------If condition visited in watcher function------00',
          '(',
          points,
          ')',
        );
        calculatePoints(endLatLon.latitude, endLatLon.longitude);
      }
    };
  
    // Wathc Location Functions Error
    const error = error => {
      console.log('Location Watcher Error --> ', error);
    };
  
    // Wathc Location Functions Options
    const options = {
      enableHighAccuracy: true,
      fastestInterval: 2000,
      distanceFilter: 1,
      interval: 5000,
    };
  
    // Location Watcher Function.
    const locationWatcher = () => {
      Geolocation.watchPosition(success, error, options);
    };
  
    // Calculate Distance Functions
    const [newDistance, setNewDistance] = useState(0);
    const calculateDistance = (startLat, startLong, endLat, endLong) => {
      console.log(
        '------ calculate distance function called ---',
        endLat,
        endLong,
      );
      const earthRadius = 6371; // Earth's radius in kilometers
      const dLat = deg2rad(endLat - startLat);
      const dLon = deg2rad(endLong - startLong);
  
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(startLat)) *
          Math.cos(deg2rad(endLat)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
  
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = earthRadius * c;
  
      return distance; // Distance in kilometers
    };
  
    const deg2rad = degrees => {
      return degrees * (Math.PI / 180);
    };
    // Caculate Distance Function called and stored the distance into a avriable.
    let distance = calculateDistance(
      startLatLong.latitude,
      startLatLong.longitude,
      endLatLon.latitude,
      endLatLon.longitude,
    );
  
    // Calculate Points
    const [points, setPoints] = useState(0);
  
    const calculatePoints = (endLat, endLong) => {
      console.log('Points Function called');
      if (distance >= 0.01) {
        setPoints(points + 1);
        setStartLatLong({
          latitude: endLat,
          longitude: endLong,
        });
      } else return null;
    };
  
    // Background Services Functions.
    const option = {
      taskName: 'Location Tracker',
      taskTitle: 'Background Location Tracking',
      taskDesc: 'Location Tracking',
      taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
      },
      color: '#ff00ff',
      linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
      parameters: {
        delay: 5000,
      },
    };
    // Sleep Function.
    const sleep = time =>
      new Promise(resolve => setTimeout(() => resolve(), time));
  
    // Background task Function.
    const veryIntensiveTask = async taskDataArguments => {
      // Example of an infinite loop task
      const {delay} = taskDataArguments;
      await new Promise(async resolve => {
        for (let i = 0; BackgroundService.isRunning(); i++) {
          console.log(
            'Distance --> ',
            distance.toFixed(3),
            'New Distance --> ',
            newDistance,
            'Points --> ',
            points,
            AppState.currentState,
          );
          locationWatcher();
          await sleep(delay);
        }
      });
    };
  
    // Start Background Service Function.
    const startBackgroundServices = async () => {
      await BackgroundService.start(veryIntensiveTask, option);
      await BackgroundService.updateNotification({
        taskDesc: `Distance : ${distance.toFixed(3)}`,
      });
    };
  
    // Stop Background Service Function.
    const stopBackgroundServices = async () => {
      await BackgroundService.stop();
    };
  
    useEffect(() => {
      setTimeout(() => getCurrentLocation(), 3000);
      setTimeout(() => locationWatcher(), 3000);
    }, [AppState]);
  
    useEffect(() => {
      calculatePoints(endLatLon.latitude, endLatLon.longitude);
    }, [distance >= 0.001]);
    return (
      <View style={styles.centered}>
        <Text>Current Latitude : {startLatLong.latitude}</Text>
        <Text>Current Longitude : {startLatLong.longitude}</Text>
        <Text>End Latitude : {endLatLon.latitude}</Text>
        <Text>End Longitude : {endLatLon.longitude}</Text>
        <Text>Distance : {distance.toFixed(3)}</Text>
        <Text>Points : {points}</Text>
        <Text>New Distance : {newDistance.toFixed(3)}</Text>
  
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: 'steelblue', borderRadius: 70}]}>
          <Text>K.M. : {points / 100}</Text>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={startBackgroundServices} style={styles.btn}>
          <Text>Start Service Background</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={stopBackgroundServices} style={styles.btn2}>
          <Text>Start Service Background</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default LocationTracker;
  
  const styles = StyleSheet.create({
    centered: {
      backgroundColor: 'black',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    btn: {
      padding: 15,
      backgroundColor: 'green',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
    },
    btn2: {
      padding: 15,
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
    },
  });
  