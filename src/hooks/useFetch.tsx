import { useState, useEffect, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

interface UseFetchResult<T> {
  data: T | null;
  error: AxiosError | null;
  loading: boolean;
  refetch: () => void;
}

const useFetch = <T = unknown,>(
  url: string,
  options?: AxiosRequestConfig
): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<T> = await axios(url, options);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
};

export default useFetch;
