'use client';

import { useCallback, useState } from 'react';
import { useTransactionList } from './useTransactionList';
import { deleteTransaction as deleteTransactionService } from '@/services/transactionService';
import type { Transaction } from '@/types/transaction';

interface UseTransactionsReturn {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  fetchTransactions: () => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  refreshTransactions: () => Promise<void>;
  clearError: () => void;
}

export function useTransactions(
  initialTransactions: Transaction[] = []
): UseTransactionsReturn {
  const {
    transactions: listTransactions,
    loading: listLoading,
    error: listError,
    fetchTransactions,
    refreshTransactions,
    clearError: clearListError,
  } = useTransactionList(initialTransactions);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const loading = listLoading || isDeleting;
  const error = deleteError || listError;

  const deleteTransaction = useCallback(async (id: string) => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      await deleteTransactionService(id);
      fetchTransactions();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao deletar transação.';
      setDeleteError(errorMessage);
      throw err;
    } finally {
      setIsDeleting(false);
    }
  }, [fetchTransactions]);

  const clearError = useCallback(() => {
    clearListError();
    setDeleteError(null);
  }, [clearListError]);

  return {
    transactions: listTransactions,
    loading,
    error,
    fetchTransactions,
    deleteTransaction,
    refreshTransactions,
    clearError,
  };
}
