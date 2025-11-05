import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Text,
} from '@grupo10-pos-fiap/design-system';
import React, { useEffect, useState } from 'react';
import { Transaction } from '@/types/transaction';

interface EditTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  onConfirm: (updatedTransaction: Transaction) => Promise<void>;
}

const EditTransactionModal = ({
  isOpen,
  onClose,
  transaction,
  onConfirm,
}: EditTransactionModalProps) => {
  const [editedTransaction, setEditedTransaction] =
    useState<Transaction | null>(transaction);
  const [paymentMethodOptions, setPaymentMethodOptions] = useState<
    { id: number; label: string; value: string }[]
  >([]);

  useEffect(() => {
    setEditedTransaction(transaction);
    if (isOpen) {
      fetch('http://localhost:3001/transaction-types')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setPaymentMethodOptions(data);
          }
        })
        .catch(err => console.error('Failed to fetch transaction types', err));
    }
  }, [transaction, isOpen]);

  if (!isOpen || !editedTransaction) {
    return null;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedTransaction(prev => {
      if (!prev) return null;

      let finalValue: string | number = value;
      if (name === 'amount') {
        let onlyNumbers = value.replace(/\D/g, '');

        if (onlyNumbers === '') {
          finalValue = 0;
        } else {
          finalValue = parseFloat(onlyNumbers) / 100;
        }
      } else if (name === 'date') {
        finalValue = new Date(`${value}T00:00:00`).toISOString();
      }

      return { ...prev, [name]: finalValue };
    });
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleSave = () => {
    if (editedTransaction) {
      onConfirm(editedTransaction).then(() => {
        onClose();
      });
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} size="medium" position="center">
      <DialogHeader>
        <Text as="h3" variant="h3" weight="bold">
          Editar Transação
        </Text>
      </DialogHeader>
      <DialogBody className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="paymentMethod"
            className="text-sm font-medium text-gray-700 text-left"
          >
            Tipo de transação
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={editedTransaction.paymentMethod}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {paymentMethodOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <Input
          label="Valor a ser transferido"
          name="amount"
          type="text"
          value={formatCurrency(editedTransaction.amount)}
          onChange={handleInputChange}
        />
        <Input
          label="Data"
          name="date"
          type="date"
          value={editedTransaction.date.substring(0, 10)}
          onChange={handleInputChange}
        />
        <Input
          label="Descrição"
          name="description"
          value={editedTransaction.description}
          onChange={handleInputChange}
        />
      </DialogBody>
      <DialogFooter className="flex justify-end gap-4">
        <Button onClick={onClose} variant="outlined" type="button">
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="primary" type="button">
          Salvar Alterações
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditTransactionModal;
