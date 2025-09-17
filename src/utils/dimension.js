import { Dimensions } from 'react-native';

// dimensions.js
let current = Dimensions.get('window');

Dimensions.addEventListener?.('change', ({ window }) => {
  current = window;
});

export const width = (percent) => {
  return (current.width * percent) / 100;
};

export const height = (percent) => {
  return (current.height * percent) / 100;
};

