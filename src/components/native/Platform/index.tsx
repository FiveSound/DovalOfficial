import { Platform as RNPlatform } from 'react-native';

const Platform = {
  OS: RNPlatform.OS,
  Version: RNPlatform.Version,
  isTV: RNPlatform.isTV,
  select: RNPlatform.select,
};

export default Platform;
