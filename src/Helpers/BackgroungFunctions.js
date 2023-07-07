import BackgroundService from 'react-native-background-actions';

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

export const veryIntensiveTask = async taskDataArguments => {
  // Example of an infinite loop task
  const {delay} = taskDataArguments;
  for (let i = 0; BackgroundService.isRunning; i++) {
    try {
      console.log(
        'Start LatLng --> ',
        startPoint,
        'New LatLng--> ',
        newPoint,
        'Points-->',
        points,
      );
      await new Promise(resolve => {
        Geolocation.watchPosition(
          position => {
            const {latitude, longitude} = position.coords;
            setNewPoint({newLatitude: latitude, newLongitude: longitude});
            const distance = calculateDistance(
              startLatitude,
              startLongitude,
              newPoint.newLatitude,
              newPoint.newLongitude,
            );
            setNewDistance(distance);
            calculatePoints(newLatitude, newLongitude);
            resolve();
          },
          error => {
            console.error('Failed to track location:', error);
            resolve();
          },
          {enableHighAccuracy: true, distanceFilter: 10},
        );
      });
    } catch (error) {
      console.error('TrackLocationService error:', error);
    }

    await sleep(delay);
  }
};

export const options = {
  taskName: 'Location Tracker',
  taskTitle: 'Background Location',
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

export const startBackgrounService = async () => {
  await BackgroundService.start(veryIntensiveTask, options);
  await BackgroundService.updateNotification({
    taskDesc: distance.toFixed(3),
  });
};

export const stopBackgrounService = async () => {
  await BackgroundService.stop();
};

// Background services Buttons and logic

{
  /* <TouchableOpacity
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
    {backgroundStarted ? 'Stop Background Service' : 'Start App Background'}
  </Text>
</TouchableOpacity>; */
}
