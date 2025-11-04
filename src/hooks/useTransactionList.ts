'use client';

import { useCallback, useState } from 'react';
import { getTransactions } from '@/services/transactionService';
import { getErrorMessage } from '@/utils/errors';
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
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshTransactions = useCallback(async () => {
    await fetchTransactions();
  }, [fetchTransactions]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    refreshTransactions,
    clearError,
  };
}
