import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {calculateDistance} from '../Helpers/Functions';

const Details = () => {
  const route = useRoute();
  const {distance} = route.params;

  // const distanceCovered = calculateDistance(
  //   startLatitude,
  //   startLongitude,
  //   endlatitude,
  //   endLongitude,
  // );

  return (
    <View style={styles.center}>
      <Text style={styles.text}>Data = {distance.toFixed(3)}</Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'steelblue',
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
