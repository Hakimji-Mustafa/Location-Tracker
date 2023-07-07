import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';

const ProgressBar = ({target}) => {
  return (
    <View>
      <CircularProgress
        value={Number(target)}
        inActiveStrokeColor={'lightgrey'}
        inActiveStrokeOpacity={0.8}
        radius={58}
        progressValueColor={'black'}
        valueSuffix={`%`}
        duration={500}
        strokeColorConfig={[
          {color: 'red', value: 0},
          {color: 'orange', value: 50},
          {color: 'green', value: 100},
        ]}
      />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({});
