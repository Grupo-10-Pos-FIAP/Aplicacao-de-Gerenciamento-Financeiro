import { API_CONFIG } from './api';
import type { TransactionType } from '@/types/transactionType';
import { handleFetchError, fetchWithTimeout } from './apiUtils';

export async function getTransactionTypes(): Promise<TransactionType[]> {
  try {
    const response = await fetchWithTimeout(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRANSACTION_TYPES}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Erro ao buscar tipos de transação: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    handleFetchError(error);
  }
}
