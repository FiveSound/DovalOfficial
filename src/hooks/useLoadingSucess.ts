import { useEffect, useState } from 'react';

const useLoadingSuccess = (
  isLoading: boolean,
  delay: number = 1000,
): boolean => {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setSuccess(true);
    } else {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isLoading, delay]);

  return success;
};

export default useLoadingSuccess;
