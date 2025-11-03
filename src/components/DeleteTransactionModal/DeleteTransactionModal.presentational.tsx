import {
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
  Text,
  Spinner,
  DialogHeader,
} from '@grupo10-pos-fiap/design-system';
import { DELETE_TRANSACTION_MESSAGES } from './DeleteTransactionModal.constants';

export interface DeleteTransactionModalUIProps {
  isOpen: boolean;
  onClose: () => void;
  isDeleting: boolean;
  canDelete: boolean;
  onConfirm: () => void;
}

export function DeleteTransactionModalUI({
  isOpen,
  onClose,
  isDeleting,
  canDelete,
  onConfirm,
}: DeleteTransactionModalUIProps) {
  const confirmationMessage = canDelete
    ? DELETE_TRANSACTION_MESSAGES.CONFIRMATION
    : DELETE_TRANSACTION_MESSAGES.CANNOT_DELETE;

  return (
    <>
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        size="medium"
        position="center"
        overlay
        overlayOpacity={0.25}
        closeOnOverlayClick={!isDeleting}
        showCloseButton={false}
        aria-label={DELETE_TRANSACTION_MESSAGES.ARIA_MODAL_LABEL}
      >
        <DialogHeader>
          <Text as="h3" variant="h3" weight="bold">
            {DELETE_TRANSACTION_MESSAGES.TITLE}
          </Text>
        </DialogHeader>
        <DialogBody>
          <Text>{confirmationMessage}</Text>
        </DialogBody>

        <DialogFooter>
          <Button
            onClick={onClose}
            disabled={isDeleting}
            variant="outlined"
            aria-label={DELETE_TRANSACTION_MESSAGES.ARIA_CANCEL_BUTTON}
            type="button"
          >
            {DELETE_TRANSACTION_MESSAGES.BUTTON_CANCEL}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isDeleting || !canDelete}
            variant="primary"
            aria-label={
              isDeleting
                ? DELETE_TRANSACTION_MESSAGES.ARIA_CONFIRM_BUTTON_LOADING
                : DELETE_TRANSACTION_MESSAGES.ARIA_CONFIRM_BUTTON
            }
            aria-busy={isDeleting}
            type="button"
          >
            {isDeleting ? (
              <>
                <Spinner aria-hidden="true" size="small"/>
                {DELETE_TRANSACTION_MESSAGES.BUTTON_DELETING}
              </>
            ) : (
              DELETE_TRANSACTION_MESSAGES.BUTTON_DELETE
            )}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
