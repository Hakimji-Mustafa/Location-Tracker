import {NavigationContainer} from '@react-navigation/native';
import Details from '../Components/Details';
import LocationPermission from '../Components/LocationPermission';
import LocationTracker from '../Components/LocationTracker';
import ProgressBar from '../Components/ProgressBar';
import TargetModal from '../Components/TargetModal';

const {createNativeStackNavigator} = require('@react-navigation/native-stack');

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={LocationPermission} />
        <Stack.Screen name="Target" component={TargetModal} />
        <Stack.Screen name="Tracker" component={LocationTracker} />

        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
