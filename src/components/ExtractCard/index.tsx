import React, { useState } from 'react';

import {
  Button,
  Divider,
  Icon,
  IconButton,
  Text,
} from '@grupo10-pos-fiap/design-system';
import { DeleteTransactionModal } from '@app/transaction/components/DeleteTransactionModal';
import { Transaction } from '@types/transaction';
import { DeleteTransactionModalUI } from '@app/transaction/components/DeleteTransactionModal/DeleteTransactionModal.presentational';

interface ExtractCardProps {
  type: 'expense' | 'income';
  value: string;
  onClick: () => void;
}

const ExtractCard = ({ type, value }: ExtractCardProps) => {
  const [isOpenDeleteTransactions, setIsOpenDeleteTransactions] =
    useState(false);

  const [isOpenEditTransactions, setIsOpenEditTransactions] = useState(false);

  const isExpense = type === 'expense';
  const transactionText = isExpense
    ? 'Transferência efetuada'
    : 'Transferência recebida';

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
            R$ {value}
          </Text>
        </div>
        <IconButton
          icon={'Trash'}
          color="gray600"
          size="small"
          onClick={() => setIsOpenDeleteTransactions(true)}
        />
        <DeleteTransactionModalUI
          isOpen={isOpenDeleteTransactions}
          onClose={() => setIsOpenDeleteTransactions(false)}
          onConfirm={() => {}}
          isDeleting={false}
          canDelete={false}
        />
      </div>
      <Button variant="outlined" width={'100%'}>
        <Icon name={'SquareMenu'} color="gray600" size="small" />
        Detalhes
      </Button>
      <div className="p-1">
        <Divider />
      </div>
    </div>
  );
};

export default ExtractCard;
