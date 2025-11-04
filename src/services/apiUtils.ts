import { API_CONFIG } from './api';
import { NetworkError } from '@/utils/errors';

export function handleFetchError(error: unknown): never {
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

export async function fetchWithTimeout(
  url: string,
  options: RequestInit
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}
