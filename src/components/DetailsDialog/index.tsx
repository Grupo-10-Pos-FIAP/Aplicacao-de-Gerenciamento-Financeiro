import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Text,
} from '@grupo10-pos-fiap/design-system';
import React from 'react';

interface DetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const DetailsDialog = ({ isOpen, onClose }: DetailsDialogProps) => {
  return (
    <div>
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        position="center"
        size="medium"
        contentAlign="start"
        overlay={true}
        overlayOpacity={0.25}
        closeOnOverlayClick={true}
      >
        <DialogHeader>
          <div className="flex items-center justify-between w-full">
            <Text variant="h2" weight="semibold">
              Detalhamento
            </Text>
            <IconButton icon='SquarePen' onClick={() => {}} />
          </div>
        </DialogHeader>
        <DialogBody>
          <p>Este é um exemplo de conteúdo do Dialog.</p>
          <p>Posição: center</p>
          <p>Tamanho: medium</p>
          <p>Alinhamento: start</p>
        </DialogBody>
      </Dialog>
      <div className="flex items-center justify-between w-full"></div>
    </div>
  );
};

export default DetailsDialog;
