import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {startLocations} from '../Redux/Slice';

const Testing = () => {
  const data = useSelector(state => state.DistanceSlice.startData);

  console.log('data ---> ', data);
  const [name, setName] = useState('Mustafa');
  const dispatch = useDispatch();
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  const postApi = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {name: name},
    };

    // Send the POST request
    fetch(apiUrl, requestOptions)
      .then(response => console.log(response))
      .then(data => {
        console.log('Response:', JSON.stringify(data));
        // Handle the response data
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle any errors
      });
  };

  const getApi = async () => {
    const response = await fetch(apiUrl);
    const data = response;
    console.log('Get API Data --> ', JSON.stringify(data));
  };

  return (
    <View>
      <Text>Testing</Text>
      <Button
        title="Post Data"
        onPress={() => {
          postApi();
        }}
      />
      <Button
        title="Get Api Data"
        onPress={() => {
          getApi();
        }}
      />
    </View>
  );
};

export default Testing;

const styles = StyleSheet.create({});
