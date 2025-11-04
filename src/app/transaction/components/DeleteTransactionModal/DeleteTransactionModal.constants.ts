export const DELETE_TRANSACTION_MESSAGES = {
  TITLE: 'Excluir transferência',
  CONFIRMATION:
    'Ao optar por excluir sua transferência, ela vai ser cancelada e deletada do seu histórico de transferências.\n\nDeseja continuar?',
  CANNOT_DELETE:
    'Esta transferência não pode ser deletada pois já foi finalizada.',
  SUCCESS: 'Transferência deletada com sucesso!',
  ERROR_DEFAULT: 'Erro ao deletar transferência. Tente novamente.',
  BUTTON_DELETE: 'Excluir',
  BUTTON_DELETING: 'Excluindo...',
  BUTTON_CANCEL: 'Cancelar',
  ARIA_MODAL_LABEL: 'Modal de exclusão de transferência',
  ARIA_CANCEL_BUTTON: 'Cancelar exclusão',
  ARIA_CONFIRM_BUTTON: 'Confirmar exclusão',
  ARIA_CONFIRM_BUTTON_LOADING: 'Excluindo transferência...',
} as const;

export const DELETE_TRANSACTION_TIMING = {
  SNACKBAR_DURATION: 6000,
  SUCCESS_CLOSE_DELAY: 2000,
} as const;
