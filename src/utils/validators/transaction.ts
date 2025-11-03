import type { TransactionStatus } from '@/types/transaction';

export function canDeleteTransaction(status: TransactionStatus): boolean {
  return status === 'pending';
}

