const PAYMENT_METHOD_TRANSLATIONS: Record<string, string> = {
  credit_card: 'Cartão de Crédito',
  debit_card: 'Cartão de Débito',
  bank_transfer: 'Transferência Bancária',
  pix: 'PIX',
  cash: 'Dinheiro',
} as const;

export function translatePaymentMethod(paymentMethod: string): string {
  return PAYMENT_METHOD_TRANSLATIONS[paymentMethod] || paymentMethod;
}

