import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    console.log(
      `[useDebounce] Value changed to "${value}". Setting up a timeout of ${delay}ms.`,
    );
    const handler = setTimeout(() => {
      console.log(`[useDebounce] Debounced value updated to "${value}".`);
      setDebouncedValue(value);
    }, delay);

    return () => {
      console.log(`[useDebounce] Clearing timeout for value "${value}".`);
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
