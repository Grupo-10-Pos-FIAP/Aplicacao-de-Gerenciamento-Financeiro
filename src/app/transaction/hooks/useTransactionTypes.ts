import { useEffect } from 'react';
import { getTransactionTypes } from '@/services/transactionTypeService';
import { useFetch } from '@/hooks/useFetch';

export const useTransactionTypes = () => {
  const {
    data: transactionTypes,
    loading: isLoading,
    error,
    fetchData: fetchTransactionTypes,
    clearError,
  } = useFetch(getTransactionTypes, []);

  useEffect(() => {
    fetchTransactionTypes();
  }, [fetchTransactionTypes]);

  return {
    transactionTypes,
    isLoading,
    error,
    fetchTransactionTypes,
    clearError,
  };
};
