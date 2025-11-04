import { useState, useEffect, useCallback } from 'react';

interface TransactionType {
  id: number;
  label: string;
  value: string;
}

export const useTransactionTypes = () => {
  const [transactionTypes, setTransactionTypes] = useState<TransactionType[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTransactionTypes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/transaction-types');
      if (!response.ok) throw new Error('Falha ao buscar tipos de transação');
      const data: TransactionType[] = await response.json();
      setTransactionTypes(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Ocorreu um erro'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactionTypes();
  }, [fetchTransactionTypes]);

  return { transactionTypes, isLoading, error };
};
