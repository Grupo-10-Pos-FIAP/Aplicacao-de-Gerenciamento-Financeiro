'use client';

import { useCallback } from 'react';
import { getTransactions } from '@/services/transactionService';
import { useFetch } from './useFetch';
import type { Transaction } from '@/types/transaction';

interface UseTransactionListReturn {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  fetchTransactions: () => Promise<void>;
  refreshTransactions: () => Promise<void>;
  clearError: () => void;
}

export function useTransactionList(
  initialTransactions: Transaction[] = []
): UseTransactionListReturn {
  const {
    data: transactions,
    loading,
    error,
    fetchData: fetchTransactions,
    clearError,
  } = useFetch(getTransactions, initialTransactions);

  const refreshTransactions = useCallback(async () => {
    await fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    refreshTransactions,
    clearError,
  };
}
