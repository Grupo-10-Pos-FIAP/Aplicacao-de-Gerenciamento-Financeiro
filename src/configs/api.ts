const getApiBaseUrl = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (envUrl) {
    return envUrl;
  }
  
  if (process.env.NODE_ENV === 'development') {
    const defaultDevUrl = 'http://localhost:3001';
    if (typeof window === 'undefined') {
      console.warn(
        '⚠️ NEXT_PUBLIC_API_URL não definida. Usando fallback:',
        defaultDevUrl
      );
    }
    return defaultDevUrl;
  }
  
  if (typeof window !== 'undefined') {
    throw new Error(
      'A variável de ambiente NEXT_PUBLIC_API_URL não está definida e não há fallback disponível.'
    );
  }
  
  return '';
};

export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),
  ENDPOINTS: {
    TRANSACTIONS: '/transactions',
    TRANSACTION_BY_ID: (id: number | string) => `/transactions/${id}`,
  },
  TIMEOUT: 10000,
} as const;
