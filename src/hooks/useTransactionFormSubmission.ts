import { useState } from 'react';
import { createTransaction } from '@/services/transactionService';
import type { Transaction, Category } from '@/types/transaction';

import { getErrorMessage } from '@/utils/errors';
export interface TransactionFormData {
  transactionType: Category | '';
  selectedAccount: string;
  amount: string;
  date: string;
}

const validateFormData = (formData: TransactionFormData): string | null => {
  if (!formData.transactionType) {
    return 'Selecione o tipo de transferência';
  }
  if (!formData.selectedAccount) {
    return 'Selecione uma conta';
  }
  if (!formData.amount) {
    return 'Informe o valor da transferência';
  }
  if (!formData.date) {
    return 'Selecione a data';
  }
  return null;
};

export const useTransactionFormSubmission = (onSuccess?: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    variant: 'success' | 'error';
  }>({ open: false, message: '', variant: 'success' });

  const handleSubmit = async (
    event: React.FormEvent,
    formData: TransactionFormData
  ) => {
    event.preventDefault();
    setIsSubmitting(true);

    const validationError = validateFormData(formData);
    if (validationError) {
      setSnackbar({ open: true, message: validationError, variant: 'error' });
      setIsSubmitting(false);
      return;
    }

    if (!formData.transactionType) {
      return;
    }

    const newTransaction: Omit<Transaction, 'id'> = {
      amount: parseFloat(formData.amount),
      currency: 'BRL',
      description: `Transferência para conta ${formData.selectedAccount}`,
      date: new Date(`${formData.date}T00:00:00`).toISOString(),
      type: 'expense',
      category: formData.transactionType,
      status: 'completed',
      paymentMethod: 'pix',
    };

    try {
      await createTransaction(newTransaction);
      setSnackbar({
        open: true,
        message: 'Sua transferência foi realizada com sucesso.',
        variant: 'success',
      });
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: getErrorMessage(error),
        variant: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, snackbar, setSnackbar, handleSubmit };
};
