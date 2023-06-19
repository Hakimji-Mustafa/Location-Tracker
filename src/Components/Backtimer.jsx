import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

const BackTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  console.log(time);
  // Start the timer
  const startTimer = async () => {
    await BackgroundTimer.start();
    setIsRunning(true);
  };

  // Stop the timer
  const stopTimer = () => {
    BackgroundTimer.stop();
    setIsRunning(false);
    setTime(0);
  };

  // Update the time every second
  useEffect(() => {
    let intervalId = null;

    if (isRunning) {
      intervalId = BackgroundTimer.setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    // Return a function that will be called when the component is unmounted or the timer is stopped
    return () => {
      if (intervalId) {
        BackgroundTimer.clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text style={{alignSelf: 'center', fontSize: 20}}>
        Time: {time} seconds
      </Text>

      {/* Start/Stop buttons */}
      {isRunning ? (
        <Button title="Stop" onPress={stopTimer} />
      ) : (
        <Button title="Start" onPress={startTimer} />
      )}
    </View>
  );
};

export default BackTimer;
