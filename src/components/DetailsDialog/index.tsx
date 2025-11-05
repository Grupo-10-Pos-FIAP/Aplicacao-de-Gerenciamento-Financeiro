import EditTransactionModal from '@app/transaction/components/EditTransactionModal';
import { Transaction } from '@/types/transaction';
import {
  Dialog,
  DialogBody,
  DialogHeader,
  Divider,
  IconButton,
  Text,
} from '@grupo10-pos-fiap/design-system';
import React, { useEffect, useState } from 'react';

interface DetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
}

const DetailsDialog = ({
  isOpen,
  onClose,
  transaction,
}: DetailsDialogProps) => {
  const [isOpenEditTransactionModal, setIsOpenEditTransactionModal] =
    useState(false);
  const [transactionToEdit, setTransactionToEdit] =
    useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [paymentMethodLabel, setPaymentMethodLabel] = useState('');

  useEffect(() => {
    if (isOpen && transaction) {
      fetch('http://localhost:3001/transaction-types')
        .then(res => res.json())
        .then(types => {
          const type = types.find(
            (t: { id: number }) => t.id.toString() === transaction.paymentMethod
          );
          setPaymentMethodLabel(type ? type.label : 'Não identificado');
        })
        .catch(() => setPaymentMethodLabel('Erro ao buscar'));
    }
  }, [isOpen, transaction]);

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
      showCloseButton={true}
    >
      <DialogHeader className="w-full px-6">
        <div className="flex items-center justify-between w-full">
          <Text variant="h2" weight="semibold">
            Detalhamento
          </Text>

          <IconButton
            icon="SquarePen"
            color="gray600"
            onClick={() => setIsOpenEditTransactionModal(true)}
          />
          {isOpenEditTransactionModal && (
            <EditTransactionModal
              isOpen={isOpenEditTransactionModal}
              onClose={() => setIsOpenEditTransactionModal(false)}
              transaction={transaction}
              onConfirm={async updatedTransaction => {
                const response = await fetch(
                  `http://localhost:3001/transactions/${updatedTransaction.id}`,
                  {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedTransaction),
                  }
                );
                const result = await response.json();
              }}
            />
          )}
        </div>
      </DialogHeader>

      <DialogBody className="w-full px-6">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center justify-between w-full">
            <Text variant="body" color="gray800">
              De
            </Text>
            <Text variant="body" color="gray600">
              {transaction.from}
            </Text>
          </div>

          <div className="flex items-center justify-between w-full">
            <Text variant="body" color="gray800">
              Para
            </Text>
            <Text variant="body" color="gray600">
              {transaction.to}
            </Text>
          </div>
          <Divider />
          <div className="flex items-center justify-between w-full">
            <Text variant="body" color="gray800">
              Banco
            </Text>
            <Text variant="body" color="gray600">
              {transaction.bank}
            </Text>
          </div>

          <div className="flex items-center justify-between w-full">
            <Text variant="body" color="gray800">
              Tipo
            </Text>
            <Text variant="body" color="gray600">
              {paymentMethodLabel}
            </Text>
          </div>

          <div className="flex items-center justify-between w-full">
            <Text variant="body" color="gray800">
              Valor
            </Text>
            <Text variant="body" color="gray600">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(transaction.amount)}
            </Text>
          </div>
          <Divider />

          <div className="flex items-center justify-between w-full">
            <Text variant="body" color="gray800">
              Data
            </Text>
            <Text variant="body" color="gray600">
              {new Date(transaction.date).toLocaleDateString('pt-BR')}
            </Text>
          </div>

          <div className="flex items-center justify-between w-full">
            <Text variant="body" color="gray800">
              Hora
            </Text>
            <Text variant="body" color="gray600">
              {new Date(transaction.date).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default DetailsDialog;
