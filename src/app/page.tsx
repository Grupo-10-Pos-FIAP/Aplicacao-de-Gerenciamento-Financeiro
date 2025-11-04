'use client';
import { useEffect, useState } from 'react';
import { Avatar } from '@components/Avatar';
import { AvatarProps } from '@components/Avatar/interfaces';
import { Card, Icon, IconButton } from '@grupo10-pos-fiap/design-system';
import NewTransactionsModal from '@components/NewTransactionsModal';

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
        <h3 className="font-bold text-[#1C2024] text-2xl">Extrato</h3>
        <div className="p-3 rounded-lg flex gap-3 bg-white/80">
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex gap-2 items-center">
              <Icon name="ArrowUpRight" size="small" color="error" />
              <p className="text-[#555555] font-normal text-xs">
                Transferência efetuada
              </p>
            </div>
            <p className="font-bold text-lg text-[#1C2024]">R$ 5.000,00</p>
          </div>
          <div className="flex flex-1"></div>
        </div>
      </div>
    </div>
  );
}
