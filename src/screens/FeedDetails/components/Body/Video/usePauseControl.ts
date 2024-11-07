import { useState, useCallback } from 'react';

const usePauseControl = (initialState = false) => {
  const [isPaused, setIsPaused] = useState(initialState);

  const togglePause = useCallback(() => {
    setIsPaused(prev => {
      const newState = !prev;
      return newState;
    });
  }, []);

  const setPause = useCallback((state: boolean) => {
    setIsPaused(state);
  }, []);

  return { isPaused, togglePause, setPause };
};

export default usePauseControl;
