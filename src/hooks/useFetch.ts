'use client';

import { useState, useCallback } from 'react';
import { getErrorMessage } from '@/utils/errors';

interface UseFetchReturn<T> {
  data: T;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  clearError: () => void;
}

export function useFetch<T>(
  fetcher: () => Promise<T>,
  initialData: T
): UseFetchReturn<T> {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { data, loading, error, fetchData, clearError };
}
