import type { Transaction } from '@/types/transaction';

export function isTransactionValid(
  transaction: Transaction | null | undefined
): transaction is Transaction {
  return (
    transaction !== null &&
    transaction !== undefined &&
    typeof transaction.id === 'number' &&
    transaction.id > 0 &&
    typeof transaction.status === 'string'
  );
}

export function isTransactionId(id: unknown): id is number {
  return typeof id === 'number' && id > 0;
}

