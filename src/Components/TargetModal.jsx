import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getCityName, calculateDistance} from '../Helpers/Functions';
import Geolocation from 'react-native-geolocation-service';

const TargetModal = () => {
  const [startCity, setStartCity] = useState('');
  const [current, setCurrent] = useState('');
  const [distance, setDistance] = useState(0);

  const [startLatLon, setStartLatLon] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [endLatLong, setEndLatLong] = useState({
    latitude: 0,
    longitude: 0,
  });

  // Getting Current Location.
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        console.log('Get current location function called successfully.');
        const {latitude, longitude} = position.coords;
        const city = await getCityName(latitude, longitude);
        setStartCity(city);
        setStartLatLon({
          latitude,
          longitude,
        });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, showLocationDialog: true},
    );
  };

  // Watch Location Functions
  const success = async position => {
    console.log('Watcher function called successfully.');
    const {latitude, longitude} = position.coords;
    const city = await getCityName(latitude, longitude);

    setCurrent(city);

    setEndLatLong({
      latitude,
      longitude,
    });
  };

  const error = error => {
    console.log('Error while watching the location --> ', error);
  };

  const option = {
    enableHighAccuracy: true,
    fastestInterval: 5000,
    distanceFilter: 10,
    interval: 7000,
  };

  const watchLocation = () => {
    Geolocation.watchPosition(success, error, option);
  };

  useEffect(() => {
    const kilometers = calculateDistance(
      startLatLon.latitude,
      startLatLon.longitude,
      endLatLong.latitude,
      endLatLong.longitude,
    );
    setDistance(kilometers);
  }, [
    startLatLon.latitude,
    startLatLon.longitude,
    endLatLong.latitude,
    endLatLong.longitude,
  ]);

  // Calling the function in UseEffects to render at the loding
  useEffect(() => {
    getCurrentLocation();
    watchLocation();
  }, []);

  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={styles.text}>Welcome to My Tracking App.</Text>
      <View>
        <Text style={styles.text}>Your Start City : {startCity}</Text>
        <Text style={styles.text}>Your Current City : {current}</Text>
        <Text style={styles.text}>
          Distance we covered : {distance.toFixed(3)} K.M.
        </Text>
      </View>
    </View>
  );
};

export default TargetModal;

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    fontWeight: '600',
    color: 'white',
    margin: 10,
  },
  btn: {
    padding: 10,
    backgroundColor: 'gold',
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
