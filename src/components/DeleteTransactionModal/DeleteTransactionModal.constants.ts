export const DELETE_TRANSACTION_MESSAGES = {
  TITLE: 'Excluir transação',
  CONFIRMATION:
    'Ao optar por excluir sua transação, ela vai ser cancelada e deletada do seu histórico de transferências.\n\nDeseja continuar?',
  CANNOT_DELETE: 'Esta transação não pode ser deletada pois já foi finalizada.',
  SUCCESS: 'Transação deletada com sucesso!',
  ERROR_DEFAULT: 'Erro ao deletar transação. Tente novamente.',
  BUTTON_DELETE: 'Excluir',
  BUTTON_DELETING: 'Excluindo...',
  BUTTON_CANCEL: 'Cancelar',
  ARIA_MODAL_LABEL: 'Modal de exclusão de transação',
  ARIA_CANCEL_BUTTON: 'Cancelar exclusão',
  ARIA_CONFIRM_BUTTON: 'Confirmar exclusão',
  ARIA_CONFIRM_BUTTON_LOADING: 'Excluindo transação...',
} as const;

export const DELETE_TRANSACTION_TIMING = {
  SNACKBAR_DURATION: 6000,
  SUCCESS_CLOSE_DELAY: 2000,
} as const;

