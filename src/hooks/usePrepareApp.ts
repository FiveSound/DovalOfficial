import { useEffect } from 'react';

const usePrepareApp = (setAppIsReady: (isReady: boolean) => void) => {
  useEffect(() => {
    async function prepare() {
      try {
        const Font = await import('../components/native').then(
          module => module.Font,
        );
        await Font.loadAsync({
          'PlusJakartaSans-Bold': require('../../assets/Fonts/PlusJakartaSans-Bold.ttf'),
          'PlusJakartaSans-SemiBold': require('../../assets/Fonts/PlusJakartaSans-SemiBold.ttf'),
          'PlusJakartaSans-Medium': require('../../assets/Fonts/PlusJakartaSans-Medium.ttf'),
          'PlusJakartaSans-Regular': require('../../assets/Fonts/PlusJakartaSans-Regular.ttf'),
          'PlusJakartaSans-Light': require('../../assets/Fonts/PlusJakartaSans-Light.ttf'),
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.warn('Error preparing app', error);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [setAppIsReady]);
};

export default usePrepareApp;
