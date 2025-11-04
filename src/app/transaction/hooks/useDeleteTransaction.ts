import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import type { Transaction } from '@/types/transaction';
import { canDeleteTransaction } from '@/utils/validators';
import { getErrorMessage } from '@/utils/errors';
import { DELETE_TRANSACTION_MESSAGES } from '@app/transaction/components/DeleteTransactionModal/DeleteTransactionModal.constants';

interface UseDeleteTransactionOptions {
  onSuccess?: () => void;
  successMessage?: string;
  successCloseDelay?: number;
}

interface UseDeleteTransactionReturn {
  isDeleting: boolean;
  error: string | null;
  success: string | null;
  canDelete: boolean;
  deleteTransaction: () => Promise<void>;
  reset: () => void;
  clearMessages: () => void;
}

export function useDeleteTransaction(
  transaction: Transaction | null,
  onConfirm: (transaction: Transaction) => Promise<void>,
  options: UseDeleteTransactionOptions = {}
): UseDeleteTransactionReturn {
  const { onSuccess, successMessage = DELETE_TRANSACTION_MESSAGES.SUCCESS } =
    options;

  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const isMountedRef = useRef(true);

  const canDelete = useMemo(
    () => (transaction ? canDeleteTransaction(transaction.status) : false),
    [transaction]
  );

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  const reset = useCallback(() => {
    setIsDeleting(false);
    clearMessages();
  }, [clearMessages]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const deleteTransaction = useCallback(async () => {
    if (!transaction || !canDelete || isDeleting) return;

    setIsDeleting(true);
    clearMessages();

    try {
      await onConfirm(transaction);

      if (!isMountedRef.current) return;

      setSuccess(successMessage);

      onSuccess?.();
    } catch (err) {
      if (!isMountedRef.current) return;
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
    } finally {
      if (isMountedRef.current) {
        setIsDeleting(false);
      }
    }
  }, [
    transaction,
    canDelete,
    isDeleting,
    clearMessages,
    onConfirm,
    successMessage,
    onSuccess,
  ]);

  return {
    isDeleting,
    error,
    success,
    canDelete,
    deleteTransaction,
    reset,
    clearMessages,
  };
}
