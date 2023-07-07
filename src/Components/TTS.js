import Tts from 'react-native-tts';

export const kilometersSpek = km => {
  if (km % 1 === 0) {
    Tts.speak(
      `You have completed One Kilometer and total distance covered is ${km} Kilometers`,
    );
  } else return;
};
