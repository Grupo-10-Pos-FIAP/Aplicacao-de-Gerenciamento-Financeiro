import EditTransactionModal from '@app/transaction/components/EditTransactionModal';
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Divider,
  IconButton,
  Text,
} from '@grupo10-pos-fiap/design-system';
import React, { useState } from 'react';

interface DetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const DetailsDialog = ({ isOpen, onClose }: DetailsDialogProps) => {
  const [isOpenEditTransactionModal, setIsOpenEditTransactionModal] = useState(false);
  
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      position="center"
      size="medium"
      contentAlign="start"
      overlay={true}
      overlayOpacity={0.25}
      closeOnOverlayClick={true}
      showCloseButton={false}
    >
      <DialogHeader className="w-full px-6">
        <div className="flex items-center justify-between w-full">
          <Text variant="h2" weight="semibold">
            Detalhamento
          </Text>
        
        <IconButton icon='SquarePen' color='gray600' onClick={() => setIsOpenEditTransactionModal(true)} />
        <EditTransactionModal type={'expense'} value={''} isOpen={isOpenEditTransactionModal} onClose={() => setIsOpenEditTransactionModal(false) }></EditTransactionModal>
        </div>
         
      </DialogHeader>

      <DialogBody className="w-full px-6">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center justify-between w-full">
            <Text variant="body" color="gray800">De</Text>
            <Text variant="body" color="gray600">*usuário*</Text>
          </div>
          
          <div className="flex items-center justify-between w-full">
            <Text variant="body" color="gray800">Para</Text>
            <Text variant="body" color="gray600">Bruna Maria</Text>
          </div>
          <Divider />
          <div className="flex items-center justify-between w-full">
            <Text variant="body" color="gray800">Banco</Text>
            <Text variant="body" color="gray600">Banco Invest Plus</Text>
          </div>
          
          <div className="flex items-center justify-between w-full">
            <Text variant="body" color="gray800">Tipo</Text>
            <Text variant="body" color="gray600">DOC/TED</Text>
          </div>

          <div className="flex items-center justify-between w-full">
            <Text variant="body" color="gray800">Valor</Text>
            <Text variant="body" color="gray600">R$ 5.000,00</Text>
          </div>
          <Divider />

          <div className="flex items-center justify-between w-full">
            <Text variant="body" color="gray800">Data</Text>
            <Text variant="body" color="gray600">15/10/2025</Text>
          </div>

          <div className="flex items-center justify-between w-full">
            <Text variant="body" color="gray800">Hora</Text>
            <Text variant="body" color="gray600">16:46</Text>
          </div>
        </div>
      </DialogBody>

    </Dialog>
  );
};

export default DetailsDialog;