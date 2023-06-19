import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {useNavigation} from '@react-navigation/native';
import BackgroundService from 'react-native-background-actions';

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

const LocationTracker = () => {
  const veryIntensiveTask = async taskDataArguments => {
    // Example of an infinite loop task
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        console.log(`Timer ${i} Distance: ${distance} Points: ${points}`);

        watchLocation();
        calculatePoints(newLatitude, newLongitude);
        await BackgroundService.updateNotification({
          taskDesc: `Updated Points:- ${points} Distance:- ${distance}`,
        });
        await sleep(delay);
      }
    });
  };
  const options = {
    taskName: 'Location Tracker',
    taskTitle: 'Background location',
    taskDesc: 'Track the Locatio in Background',
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

  const startBackgrounService = async () => {
    await BackgroundService.start(veryIntensiveTask, options);
    await BackgroundService.updateNotification({
      taskDesc: 'Location tracking',
    });
  };

  const stopBackgrounService = async () => {
    await BackgroundService.stop();
  };

  const [points, setPoints] = useState(0);
  const [backgroundStarted, setBackgroundStarted] = useState(false);

  const [startPoint, setStartPoint] = useState({
    startLatitude,
    startLongitude,
  });

  const [newPoint, setNewPoint] = useState({
    newLongitude,
    newLatitude,
  });

  const [timeAndPoints, setTimeAndPoints] = useState([]);

  const navigation = useNavigation();

  // Getting Current Location.
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        Alert.alert('Get current location function called successfully.');
        setStartPoint({
          startLongitude: position.coords.longitude,
          startLatitude: position.coords.latitude,
        });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, distanceFilter: 10, showLocationDialog: true},
    );
  };

  // Watch Location Functions
  const success = posi => {
    Alert.alert('Watcher function called successfully.');
    setNewPoint({
      newLatitude: posi.coords.latitude,
      newLongitude: posi.coords.longitude,
    });
  };

  const error = error => {
    console.log('Error while watching the location --> ', error);
  };

  const option = {
    enableHighAccuracy: true,
    fastestInterval: 5000,
    distanceFilter: 10,
    interval: 10000,
  };

  const watchLocation = () => {
    Geolocation.watchPosition(success, error, option);
  };

  // Calling the function in UseEffects to render at the loding

  useEffect(() => {
    getCurrentLocation();
    watchLocation();
  }, []);

  const {startLatitude, startLongitude} = startPoint;

  const {newLatitude, newLongitude} = newPoint;

  //   calculating the distance based on the longitude and latitude
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371; // Earth's radius in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance; // Distance in kilometers
  };

  const deg2rad = degrees => {
    return degrees * (Math.PI / 180);
  };

  let distance = calculateDistance(
    startLatitude,
    startLongitude,
    newLatitude,
    newLongitude,
  );

  // Dispalay Distance is here
  const distanceToDisplay = (points / 100).toFixed(3);

  // calculate points function is here
  const calculatePoints = (newLat, newLon) => {
    if (distance >= 0.01) {
      setPoints(points + 1);
      setStartPoint({
        startLatitude: newLat,
        startLongitude: newLon,
      });
      setTimeAndPoints([
        ...timeAndPoints,
        {
          time: Date.now(),
          points: points,
          dis: distanceToDisplay,
        },
      ]);
    }
  };

  useEffect(() => {
    calculatePoints(newLatitude, newLongitude);
    console.log(
      'Calculate Points functions is triggered --> ',
      distance.toFixed(3),
      'Points --> ',
      points,
    );
  }, [distance >= 0.01]);

  const resetToDefault = () => {
    getCurrentLocation();
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{fontSize: 19, fontWeight: '700', color: 'green', margin: 15}}>
          Start Location
        </Text>
        <Text
          style={{fontSize: 19, fontWeight: '700', color: 'black', margin: 15}}>
          Latitude:- {startLatitude}
        </Text>
        <Text
          style={{fontSize: 19, fontWeight: '700', color: 'black', margin: 15}}>
          Longitude:- {startLongitude}
        </Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 2,
            width: '100%',
            margin: 20,
          }}
        />
        <Text
          style={{
            fontSize: 19,
            fontWeight: '700',
            color: 'orange',
            margin: 15,
          }}>
          Update Location
        </Text>
        <Text
          style={{fontSize: 19, fontWeight: '700', color: 'black', margin: 15}}>
          Updated Latitude:- {newLatitude}
        </Text>
        <Text
          style={{fontSize: 19, fontWeight: '700', color: 'black', margin: 15}}>
          Updated Longitude:- {newLongitude}
        </Text>

        <TouchableOpacity
          onPress={() => resetToDefault()}
          style={{
            padding: 15,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'orange',
          }}>
          <Text style={styles.btnText}>Refresh location</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 17, fontWeight: '700', color: 'green'}}>
          Distance we covered:- {distanceToDisplay}
        </Text>

        <Text
          style={{
            fontSize: 17,
            fontWeight: '700',
            color: 'green',
            marginTop: 20,
          }}>
          Total Points:- {points}
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontWeight: '700',
            color: 'green',
            marginTop: 20,
          }}>
          Distance variable:- {Number(distance).toFixed(3)}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Details', {
            data: timeAndPoints.map(item => item),
          });
        }}
        style={{
          padding: 15,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'gold',
          marginTop: 15,
        }}>
        <Text style={styles.btnText}>View Details</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          if (!backgroundStarted) {
            startBackgrounService();
            setBackgroundStarted(true);
          } else {
            setBackgroundStarted(false);
            stopBackgrounService();
          }
        }}
        style={{
          padding: 15,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: backgroundStarted ? 'red' : 'gold',
          marginTop: 15,
        }}>
        <Text style={styles.btnText}>
          {backgroundStarted
            ? 'Stop Background Service'
            : 'Start App Background'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LocationTracker;

const styles = StyleSheet.create({
  btnText: {fontSize: 17, fontWeight: '700', color: 'white'},
});
