export class ApiError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
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
    Object.setPrototypeOf(this, TransactionError.prototype);
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
    Object.setPrototypeOf(this, TransactionCreateError.prototype);
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
    Object.setPrototypeOf(this, TransactionDeleteError.prototype);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = 'Transferência não encontrada.') {
    super(message, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class NetworkError extends ApiError {
  constructor(
    message: string = 'Erro de conexão. Verifique sua internet e tente novamente.'
  ) {
    super(message, 'NETWORK_ERROR', 0);
    this.name = 'NetworkError';
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

export class UnauthorizedDeleteError extends TransactionDeleteError {
  constructor(
    message: string = 'Esta transferência não pode ser deletada pois já foi finalizada.'
  ) {
    super(message, 'UNAUTHORIZED_DELETE', 403);
    this.name = 'UnauthorizedDeleteError';
    Object.setPrototypeOf(this, UnauthorizedDeleteError.prototype);
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
    Object.setPrototypeOf(this, TransactionFetchError.prototype);
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
