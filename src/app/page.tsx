'use client';
import { useEffect, useState } from 'react';
import {
  Text,
  Icon,
  IconButton,
  Loading,
} from '@grupo10-pos-fiap/design-system';
import NewTransactionsModal from '@app/transaction/components/NewTransactionsModal';
import ExtractCard from '@components/ExtractCard';
import { Transaction } from '@/types/transaction';
import EditTransactionModal from '@app/transaction/components/EditTransactionModal';
import { DeleteTransactionModal } from '@app/transaction/components/DeleteTransactionModal/DeleteTransactionModal';

export default function Home() {
  const [visible, setVisible] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [transactionToDelete, setTransactionToDelete] =
    useState<Transaction | null>(null);
  const [transactionToEdit, setTransactionToEdit] =
    useState<Transaction | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/transactions')
      .then(res => res.json())
      .then(data => {
        setTransactions(data);
      });
    setLoading(false);
  }, []);

  const handleOpenDeleteModal = (transaction: Transaction) => {
    setTransactionToDelete(transaction);
  };

  const handleCloseDeleteModal = () => {
    setTransactionToDelete(null);
  };

  const handleOpenEditModal = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
  };

  const handleCloseEditModal = () => {
    setTransactionToEdit(null);
  };

  const handleConfirmDelete = async (transaction: Transaction) => {
    await fetch(`http://localhost:3001/transactions/${transaction.id}`, {
      method: 'DELETE',
    });

    setTransactions(currentTransactions =>
      currentTransactions.filter(t => t.id !== transaction.id)
    );
  };

  const handleConfirmEdit = async (updatedTransaction: Transaction) => {
    const response = await fetch(
      `http://localhost:3001/transactions/${updatedTransaction.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTransaction),
      }
    );
    const result = await response.json();

    setTransactions(currentTransactions =>
      currentTransactions.map(t => (t.id === result.id ? result : t))
    );
  };

  if (loading) return <Loading />;
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
                <p className="font-bold text-xl text-white">R$ 5.000,00</p>
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
        <div className="p-3 rounded-lg flex flex-col gap-3 bg-white/80 overflow-y-auto">
          {transactions.map(transaction => (
            <ExtractCard
              key={transaction.id}
              transaction={transaction}
              onDelete={() => handleOpenDeleteModal(transaction)}
              onEdit={() => handleOpenEditModal(transaction)}
            />
          ))}
          <div className="flex flex-1"></div>
        </div>

        <DeleteTransactionModal
          isOpen={!!transactionToDelete}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          transaction={transactionToDelete}
        />

        <EditTransactionModal
          isOpen={!!transactionToEdit}
          onClose={handleCloseEditModal}
          transaction={transactionToEdit}
          onConfirm={handleConfirmEdit}
        />
      </div>
    </div>
  );
}
