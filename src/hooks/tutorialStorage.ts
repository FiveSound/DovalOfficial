import AsyncStorage from '@react-native-async-storage/async-storage';

const TUTORIAL_STATUS_KEY = 'tutorialStatus';
const TUTORIAL_SHOWN = 'shown';
const TUTORIAL_HIDDEN = 'false';

export const getTutorialStatus = async (key: string) => {
  try {
    const status = await AsyncStorage.getItem(`tutorial_${key}`);
    return status;
  } catch (error) {
    console.error('Error getting tutorial status:', error);
    return null;
  }
};

export const setTutorialStatus = async (key: string, status: string) => {
  try {
    await AsyncStorage.setItem(`tutorial_${key}`, status);
  } catch (error) {
    console.error('Error setting tutorial status:', error);
  }
};
