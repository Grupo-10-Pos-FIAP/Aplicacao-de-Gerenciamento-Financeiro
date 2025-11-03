export type TransactionStatus = 'pending' | 'completed';

export type TransactionType = 'income' | 'expense';

export type PaymentMethod =
  | 'credit_card'
  | 'debit_card'
  | 'bank_transfer'
  | 'pix'
  | 'cash';

export type Category =
  | 'alimentacao'
  | 'transporte'
  | 'moradia'
  | 'saude'
  | 'entretenimento'
  | 'investimentos'
  | 'salario'
  | 'renda_extra'
  | 'outros';

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  description: string;
  date: string;
  type: TransactionType;
  category: Category;
  status: TransactionStatus;
  paymentMethod: PaymentMethod;
}
