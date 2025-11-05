'use client';
import { useState } from 'react';
import { Text, Icon, IconButton } from '@grupo10-pos-fiap/design-system';
import NewTransactionsModal from '@app/transaction/components/NewTransactionsModal';
import EditTransactionModal from './transaction/components/EditTransactionModal';

export default function Home() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="flex sm:flex-row gap-6 h-full w-full max-sm:flex-col">
      <div className="flex flex-1 flex-col gap-6 h-full">
        <div className="flex flex-col rounded-3xl p-6 bg-linear-to-r from-[#1C6EA4] to-[#658864]">
          <div className="flex items-center justify-between">
            <p className="font-bold text-2xl text-white">Saldo</p>
            <IconButton
              className="hover:bg-transparent"
              icon={visible ? 'Eye' : 'EyeOff'}
              size="medium"
              variant="transparent"
              onClick={() => setVisible(!visible)}
            />
          </div>
          {visible && (
            <div className="flex flex-col gap-1">
              <div className="flex items-center">
                <p className="font-bold text-xl text-white">R$ 5000,00</p>
                <Icon name="ArrowUpRight" size="small" color="white" />
              </div>
              <p className="font-normal text-xs text-white">
                Rendeu 3% desde o mês passado
              </p>
            </div>
          )}
        </div>
        <NewTransactionsModal />
      </div>
      <div className=" flex-1 p-6 flex flex-col gap-2 bg-white rounded-3xl">
        <Text variant="h2" weight="semibold">
          Extrato
        </Text>
        <div className="p-3 rounded-lg flex gap-3 bg-white/80">
          <EditTransactionModal type={'expense'} value={'5000,00'} onClick={function (): void {
            throw new Error('Function not implemented.');
          } } />
          <div className="flex flex-1"></div>
        </div>
      </div>
    </div>
  );
}
