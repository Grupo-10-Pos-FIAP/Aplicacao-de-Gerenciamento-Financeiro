export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000,
  ENDPOINTS: {
    TRANSACTIONS: '/transactions',
    TRANSACTION_BY_ID: (id: string) => `/transactions/${id}`,
    CONTACTS: '/contacts',
    CONTACT_BY_ID: (id: string) => `/contacts/${id}`,
    TRANSACTION_TYPES: '/transaction-types',
  },
} as const;
