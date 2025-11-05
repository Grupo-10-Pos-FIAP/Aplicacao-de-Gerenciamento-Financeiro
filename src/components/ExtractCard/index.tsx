'use client';

import React, { useState } from 'react';
import {
  Button,
  Divider,
  Icon,
  IconButton,
  Text,
} from '@grupo10-pos-fiap/design-system';
import DetailsDialog from '@components/DetailsDialog';
import { Transaction } from '@/types/transaction';

interface ExtractCardProps {
  transaction: Transaction;
  onDelete: () => void;
  onEdit: () => void;
}

const ExtractCard = ({ transaction, onDelete, onEdit }: ExtractCardProps) => {
  const [isOpenDetailsDialog, setIsOpenDetailsDialog] = useState(false);

  const isExpense = transaction.type === 'expense';
  const transactionText = isExpense
    ? 'Transferência efetuada'
    : 'Transferência recebida';

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(transaction.amount));

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex gap-2 items-center">
            <Icon
              name={isExpense ? 'ArrowUpRight' : 'ArrowDownRight'}
              size="small"
              color={isExpense ? 'error' : 'success'}
            />
            <Text variant="caption" color="gray600">
              {transactionText}
            </Text>
          </div>
          <Text weight="bold" variant="h4">
            R$ {formattedValue}
          </Text>
        </div>
        <div className="flex items-center gap-2">
          <IconButton
            icon={'SquarePen'}
            color="gray600"
            size="small"
            onClick={onEdit}
          />
          <IconButton
            icon={'Trash'}
            color="gray600"
            size="small"
            onClick={onDelete}
          />
        </div>
      </div>

      <Button
        variant="outlined"
        width={'100%'}
        onClick={() => setIsOpenDetailsDialog(true)}
      >
        <Icon name={'SquareMenu'} color="gray600" size="small" />
        Detalhes
      </Button>

      <DetailsDialog
        isOpen={isOpenDetailsDialog}
        transaction={transaction}
        onClose={() => setIsOpenDetailsDialog(false)}
      />

      <div className="p-1">
        <Divider />
      </div>
    </div>
  );
};

export default ExtractCard;
