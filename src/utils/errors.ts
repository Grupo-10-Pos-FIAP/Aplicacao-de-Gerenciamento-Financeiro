export class ApiError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class TransactionError extends ApiError {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message, code, statusCode);
    this.name = 'TransactionError';
  }
}

export class TransactionCreateError extends TransactionError {
  constructor(
    message: string = 'Erro ao criar transferência.',
    code: string = 'CREATE_ERROR',
    statusCode?: number
  ) {
    super(message, code, statusCode);
    this.name = 'TransactionCreateError';
  }
}

export class TransactionDeleteError extends TransactionError {
  constructor(
    message: string = 'Erro ao deletar transferência.',
    code: string = 'DELETE_ERROR',
    statusCode?: number
  ) {
    super(message, code, statusCode);
    this.name = 'TransactionDeleteError';
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = 'Transferência não encontrada.') {
    super(message, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

export class NetworkError extends ApiError {
  constructor(
    message: string = 'Erro de conexão. Verifique sua internet e tente novamente.'
  ) {
    super(message, 'NETWORK_ERROR', 0);
    this.name = 'NetworkError';
  }
}

export class UnauthorizedDeleteError extends TransactionError {
  constructor(
    message: string = 'Esta transferência não pode ser deletada pois já foi finalizada.'
  ) {
    super(message, 'UNAUTHORIZED_DELETE', 403);
    this.name = 'UnauthorizedDeleteError';
  }
}

export class TransactionFetchError extends TransactionError {
  constructor(
    message: string = 'Erro ao buscar transferência.',
    code: string = 'FETCH_ERROR',
    statusCode?: number
  ) {
    super(message, code, statusCode);
    this.name = 'TransactionFetchError';
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Ocorreu um erro desconhecido. Por favor, tente novamente mais tarde.';
}
