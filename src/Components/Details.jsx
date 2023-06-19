import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';

const Details = () => {
  const route = useRoute();
  const {data} = route.params;
  console.log(data);
  return (
    <ScrollView style={{flex: 1}}>
      <Text>Details</Text>
      {data &&
        data.map((item, index) => {
          const time = item.time;
          const hours = moment(time).format('HH:mm');
          if (item.points > 0) {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    maxWidth: 100,
                    justifyContent: 'flex-start',
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: 18,
                      maxWidth: 100,
                    }}>
                    {item.dis} K.M.
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    maxWidth: 100,
                    justifyContent: 'flex-start',
                  }}>
                  <Text
                    selectable={true}
                    style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
                    {hours}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    maxWidth: 100,
                    justifyContent: 'flex-start',
                  }}>
                  <Text
                    style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
                    {item.points}
                  </Text>
                </View>
              </View>
            );
          }
        })}
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({});
