import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation, {clearWatch} from 'react-native-geolocation-service';
import {useNavigation} from '@react-navigation/native';
import BackgroundService from 'react-native-background-actions';
import {calculateDistance} from '../Helpers/Functions';
import {options} from '../Helpers/BackgroungFunctions';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearLocationData,
  endLocation,
  startLocations,
  printSlice,
  backgroundServiceStartStop,
} from '../Redux/Slice';

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));
let watchSleet = null;
const LocationTracker = ({route}) => {
  const startData = useSelector(state => state.DistanceSlice.startData);

  const endData = useSelector(state => state.DistanceSlice.endData);
  console.log('End Data 30 ---+>', endData);

  const dispatch = useDispatch();

  console.log('Start data from redux on Home Page --> ', endData);

  const isBackgroundRunning = useSelector(
    state => state.DistanceSlice.isBackgroundServiceRunnig,
  );

  const [distance, setDistance] = useState(0);
  const [points, setPoints] = useState(0);
  const [startLatLon, setStartLatLon] = useState({
    latitude: 0,
    longitude: 0,
  });

  // Destructuring LatLon data
  const {endlatitude, endLongitude} = endData;

  const navigation = useNavigation();

  // Background tasks
  const veryIntensiveTask = async taskDataArguments => {
    // Example of an infinite loop task
    const {delay} = taskDataArguments;
    for (let i = 0; BackgroundService.isRunning; i++) {
      console.log('Background --> ', i);

      await sleep(delay);
    }
  };
  const startBackgrounService = async () => {
    await BackgroundService.start(veryIntensiveTask, options);
    await BackgroundService.updateNotification({
      taskDesc: distance.toFixed(3),
    });
  };

  const stopBackgrounService = async () => {
    await BackgroundService.stop();
  };
  // Background Code ends here

  // Getting Current Location.
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('Get current location function called successfully.');
        dispatch(
          startLocations({startLatitude: latitude, startLongitude: longitude}),
        );
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, distanceFilter: 10, showLocationDialog: true},
    );
  };

  // Watch Location Functions

  // Options Watch Location function
  const option = {
    enableHighAccuracy: true,
    fastestInterval: 5000,
    distanceFilter: 10,
    interval: 10000,
  };

  const watchLocation = () => {
    watchSleet = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        dispatch(endLocation({latitude, longitude}));
      },
      error => {
        console.log('Error while watching the location --> ', error);
      },
      option,
    );
  };

  // Calling the function in UseEffects to render at the loding

  useEffect(() => {
    getCurrentLocation();
    return () => clearTimeout(sleep);
  }, []);

  useEffect(() => {
    watchLocation();
    return () => Geolocation.clearWatch(watchSleet);
  }, [endData]);

  // Calculate distance function is calling.
  useEffect(() => {
    if (
      startLatLon.latitude &&
      startLatLon.longitude &&
      endlatitude &&
      endLongitude
    ) {
      setDistance(
        calculateDistance(
          startLatLon.latitude,
          startLatLon.longitude,
          endlatitude,
          endLongitude,
        ),
      );
    }
  }, [endData.endlatitude, endData.endLongitude, startData]);

  useEffect(() => {
    if (startData.length > 0) {
      setStartLatLon({
        latitude: startData[1]?.startLatitude,
        longitude: startData[1]?.startLongitude,
      });
    }
  }, [startData]);

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{fontSize: 19, fontWeight: '700', color: 'green', margin: 15}}>
          Start Location
        </Text>
        <Text
          style={{fontSize: 19, fontWeight: '700', color: 'black', margin: 15}}>
          Latitude:- {startLatLon.latitude}
        </Text>
        <Text
          style={{fontSize: 19, fontWeight: '700', color: 'black', margin: 15}}>
          Longitude:- {startLatLon.longitude}
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
          Updated Latitude:- {endlatitude}
        </Text>
        <Text
          style={{fontSize: 19, fontWeight: '700', color: 'black', margin: 15}}>
          Updated Longitude:- {endLongitude}
        </Text>

        <TouchableOpacity
          onPress={() => {
            dispatch(clearLocationData());
            getCurrentLocation();
          }}
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
          Distance we covered:-
          {distance.toFixed(3)}
        </Text>

        <Text
          style={{
            fontSize: 17,
            fontWeight: '700',
            color: 'green',
            marginTop: 20,
          }}>
          {/* Total Points:-N/A */}
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontWeight: '700',
            color: 'green',
            marginTop: 20,
          }}>
          Distance variable:- {isNaN(distance) ? 0 : distance.toFixed(3)}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Details', {
            distance: distance,
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
      {/* Background Services code and buttons */}
      <TouchableOpacity
        onPress={() => {
          if (!isBackgroundRunning) {
            startBackgrounService();
            dispatch(backgroundServiceStartStop(!isBackgroundRunning));
          } else {
            stopBackgrounService();
            dispatch(backgroundServiceStartStop(!isBackgroundRunning));
          }
        }}
        style={{
          padding: 15,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isBackgroundRunning ? 'red' : 'gold',
          marginTop: 15,
        }}>
        <Text style={styles.btnText}>
          {isBackgroundRunning
            ? 'Stop Background Service'
            : 'Start App Background'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => dispatch(printSlice())}
        style={{
          padding: 15,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'steelblue',
          marginTop: 15,
        }}>
        <Text style={styles.btnText}>Print Current States </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LocationTracker;

const styles = StyleSheet.create({
  btnText: {fontSize: 17, fontWeight: '700', color: 'white'},
});
