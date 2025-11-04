import { API_CONFIG } from './api';
import type { Transaction } from '@/types/transaction';
import {
  NotFoundError,
  TransactionDeleteError,
  TransactionFetchError,
  TransactionCreateError,
} from '@/utils/errors';
import { handleFetchError, fetchWithTimeout } from './apiUtils';

export async function getTransactions(): Promise<Transaction[]> {
  try {
    const response = await fetchWithTimeout(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRANSACTIONS}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar transações: ${response.statusText}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('A resposta da API não é um array de transações válido.');
    }

    return data;
  } catch (error) {
    handleFetchError(error);
  }
}

export async function createTransaction(
  transactionData: Omit<Transaction, 'id'>
): Promise<Transaction> {
  try {
    const response = await fetchWithTimeout(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRANSACTIONS}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData),
      }
    );

    if (!response.ok) {
      throw new TransactionCreateError(
        'Erro ao criar transação',
        'CREATE_ERROR',
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    handleFetchError(error);
  }
}

export async function getTransactionById(
  id: string
): Promise<Transaction | null> {
  try {
    const response = await fetchWithTimeout(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRANSACTION_BY_ID(id)}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new TransactionFetchError(
        'Erro ao buscar transação',
        'FETCH_ERROR',
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    handleFetchError(error);
  }
}

export async function deleteTransaction(id: string): Promise<void> {
  try {
    const response = await fetchWithTimeout(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRANSACTION_BY_ID(id)}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new NotFoundError();
      }
      throw new TransactionDeleteError(
        'Erro ao deletar transação',
        'DELETE_ERROR',
        response.status
      );
    }
  } catch (error) {
    handleFetchError(error);
  }
}
