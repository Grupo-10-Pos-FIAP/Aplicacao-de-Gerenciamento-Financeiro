import { API_CONFIG } from '@configs/api';
import type { Transaction } from '@/types/transaction';
import {
  NetworkError,
  NotFoundError,
  TransactionDeleteError,
} from '@/utils/errors';

function handleFetchError(error: unknown): never {
  if (error instanceof Error && 'code' in error) {
    throw error;
  }

  if (error instanceof Error && error.name === 'AbortError') {
    throw new NetworkError('Tempo de espera excedido.');
  }

  throw new NetworkError(
    'Erro de conexão. Verifique sua internet e tente novamente.'
  );
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

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
      throw new NetworkError(
        `Erro ao buscar transações: ${response.statusText}`
      );
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
      throw new TransactionDeleteError(
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
