import { useState, useCallback } from 'react';
import { getTransactionTypes } from '@/services/transactionTypeService';
import type { TransactionCategoryOption } from '@/types/transactionType';

export const useTransactionTypes = () => {
  const [transactionTypes, setTransactionTypes] = useState<
    TransactionCategoryOption[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactionTypes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTransactionTypes();
      setTransactionTypes(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    transactionTypes,
    isLoading,
    error,
    fetchTransactionTypes,
    clearError,
  };
};
