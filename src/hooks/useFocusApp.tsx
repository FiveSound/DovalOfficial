import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

const useFocusApp = () => {
  const [focused, setFocused] = useState(AppState.currentState === 'active');

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState == 'active') {
        setFocused(true);
      } else {
        setFocused(false);
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.addEventListener('change', handleAppStateChange);
    };
  }, []);

  return focused;
};

export default useFocusApp;
