import { Icon, Text } from '@grupo10-pos-fiap/design-system';
import React from 'react';

interface EditTransactionModalProps {
  type: 'expense' | 'income';
  value: string;
}

const EditTransactionModal = ({
  type,
  value,
}: EditTransactionModalProps) => {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex gap-2 items-center">
        <Icon name="ArrowUpRight" size="small" color="error" />
        <Text variant="caption" color="gray600">
          {type == 'expense' } ? Transferência efetuada : Transferência efetuada
        </Text>
      </div>
      <Text weight="bold">R$ {value}</Text>
    </div>
  );
};

export default EditTransactionModal;
