export class TransactionDeleteError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'TransactionDeleteError';
    Object.setPrototypeOf(this, TransactionDeleteError.prototype);
  }
}

export class UnauthorizedDeleteError extends TransactionDeleteError {
  constructor(message: string = 'Esta transação não pode ser deletada pois já foi finalizada.') {
    super(message, 'UNAUTHORIZED_DELETE', 403);
    this.name = 'UnauthorizedDeleteError';
    Object.setPrototypeOf(this, UnauthorizedDeleteError.prototype);
  }
}

export class NetworkError extends TransactionDeleteError {
  constructor(message: string = 'Erro de conexão. Verifique sua internet e tente novamente.') {
    super(message, 'NETWORK_ERROR', 0);
    this.name = 'NetworkError';
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

export class NotFoundError extends TransactionDeleteError {
  constructor(message: string = 'Transação não encontrada.') {
    super(message, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
