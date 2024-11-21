import * as RNLinking from 'expo-linking';

const Linking = {
  ...RNLinking,
  createURL: RNLinking.createURL,
  parse: RNLinking.parse,
};

export default Linking;
