'use client';

import { useEffect, useCallback } from 'react';
import { Snackbar } from '@grupo10-pos-fiap/design-system';
import type { Transaction } from '@/types/transaction';
import { useDeleteTransaction } from '@/hooks/useDeleteTransaction';
import { isTransactionValid } from '@/utils/typeGuards';
import { DeleteTransactionModalUI } from './DeleteTransactionModal.presentational';
import { DELETE_TRANSACTION_MESSAGES, DELETE_TRANSACTION_TIMING } from './DeleteTransactionModal.constants';

export interface DeleteTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  onConfirm: (transaction: Transaction) => Promise<void>;
}

export function DeleteTransactionModal({
  isOpen,
  onClose,
  transaction,
  onConfirm,
}: DeleteTransactionModalProps) {
  const {
    isDeleting,
    error,
    success,
    canDelete,
    deleteTransaction,
    reset,
    clearMessages,
  } = useDeleteTransaction(transaction, onConfirm, {
    onSuccess: onClose,
    successMessage: DELETE_TRANSACTION_MESSAGES.SUCCESS,
    successCloseDelay: DELETE_TRANSACTION_TIMING.SUCCESS_CLOSE_DELAY,
  });

  const handleSnackbarClose = useCallback(() => {
    clearMessages();
  }, [clearMessages]);

  useEffect(() => {
    if (!isOpen && !error && !success && !isDeleting) {
      reset();
    }
  }, [isOpen, error, success, isDeleting, reset]);

  useEffect(() => {
    if (!isOpen || isDeleting) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, isDeleting, onClose]);

  const handleClose = useCallback(() => {
    if (isDeleting) return;
    reset();
    onClose();
  }, [isDeleting, onClose, reset]);

  const hasMessages = !!error || !!success;

  if (!isTransactionValid(transaction) && !hasMessages) return null;

  return (
    <>
      {isTransactionValid(transaction) && (
        <DeleteTransactionModalUI
          isOpen={isOpen}
          onClose={handleClose}
          isDeleting={isDeleting}
          canDelete={canDelete}
          onConfirm={deleteTransaction}
        />
      )}
      
      <Snackbar
        open={hasMessages}
        onOpenChange={(open) => {
          if (!open) {
            handleSnackbarClose();
          }
        }}
        message={error || success || ''}
        variant={error ? 'error' : 'success'}
        duration={DELETE_TRANSACTION_TIMING.SNACKBAR_DURATION}
        aria-live="polite"
      />
    </>
  );
}
