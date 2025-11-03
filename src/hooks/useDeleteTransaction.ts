import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import type { Transaction } from '@/types/transaction';
import { canDeleteTransaction } from '@/utils/validators';
import {
  UnauthorizedDeleteError,
  NotFoundError,
  NetworkError,
  TransactionDeleteError,
} from '@/utils/errors';
import {
  DELETE_TRANSACTION_MESSAGES,
  DELETE_TRANSACTION_TIMING,
} from '@/components/DeleteTransactionModal/DeleteTransactionModal.constants';

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
  const {
    onSuccess,
    successMessage = DELETE_TRANSACTION_MESSAGES.SUCCESS,
    successCloseDelay = DELETE_TRANSACTION_TIMING.SUCCESS_CLOSE_DELAY,
  } = options;

  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const canDelete = useMemo(
    () => (transaction ? canDeleteTransaction(transaction.status) : false),
    [transaction]
  );

  const clearTimeoutRef = useRef(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  });

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
    clearTimeoutRef.current();
  }, []);

  const reset = useCallback(() => {
    setIsDeleting(false);
    setError(null);
    setSuccess(null);
    clearTimeoutRef.current();
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    const clearTimeoutFn = clearTimeoutRef.current;
    return () => {
      isMountedRef.current = false;
      clearTimeoutFn();
    };
  }, []);

  const getErrorMessage = useCallback((err: unknown): string => {
    if (err instanceof UnauthorizedDeleteError) return err.message;
    if (err instanceof NotFoundError) return err.message;
    if (err instanceof NetworkError) return err.message;
    if (err instanceof TransactionDeleteError) return err.message;
    if (err instanceof Error) return err.message;
    return DELETE_TRANSACTION_MESSAGES.ERROR_DEFAULT;
  }, []);

  const deleteTransaction = useCallback(async () => {
    if (!transaction || !canDelete || isDeleting) return;

    setIsDeleting(true);
    setError(null);
    setSuccess(null);
    clearTimeoutRef.current();

    try {
      await onConfirm(transaction);

      if (!isMountedRef.current) return;

      setSuccess(successMessage);

      timeoutRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          setSuccess(null);
          onSuccess?.();
        }
        timeoutRef.current = null;
      }, successCloseDelay);
    } catch (err) {
      if (!isMountedRef.current) return;
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      
      timeoutRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          setError(null);
        }
        timeoutRef.current = null;
      }, DELETE_TRANSACTION_TIMING.SNACKBAR_DURATION);
    } finally {
      if (isMountedRef.current) {
        setIsDeleting(false);
      }
    }
  }, [
    transaction,
    canDelete,
    isDeleting,
    onConfirm,
    onSuccess,
    successMessage,
    successCloseDelay,
    getErrorMessage,
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

