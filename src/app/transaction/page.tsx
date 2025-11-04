'use client';
import React, { useState, useEffect } from 'react';
import { newAccount } from '@/const/newAccount';
import type { NewAccountProps } from '@/types/newAccount';
import type { NewContactProps } from '@/types/newContact';
import {
  Dropdown,
  Text,
  Tabs,
  Divider,
  Button,
  Input,
  ListItem,
  Snackbar,
} from '@grupo10-pos-fiap/design-system';
import ContactListItem from '@/components/ContactListItem';
import { useContacts } from '@/hooks/useContacts';
import type { Category } from '@/types/transaction';
import { useTransactionTypes } from '@/hooks/useTransactionTypes';
import {
  useTransactionFormSubmission,
  TransactionFormData,
} from '@/hooks/useTransactionFormSubmission';

const Transactions: React.FC = () => {
  const [formData, setFormData] = useState<
    TransactionFormData & { tab: string }
  >({
    transactionType: '',
    selectedAccount: '',
    amount: '',
    date: '',
    tab: 'tab1',
  });

  const [dropdownKey, setDropdownKey] = useState(0);
  const resetForm = () => {
    setFormData({
      transactionType: '',
      selectedAccount: '',
      amount: '',
      date: '',
      tab: 'tab1',
    });
    setActiveItem('');
    setDropdownKey(prevKey => prevKey + 1);
  };

  const [activeItem, setActiveItem] = useState<string>('');
  const {
    isSubmitting,
    snackbar,
    setSnackbar,
    handleSubmit: handleFormSubmit,
  } = useTransactionFormSubmission(resetForm);
  const {
    contacts,
    isLoading: isLoadingContacts,
    error: errorContacts,
    toggleFavorite,
  } = useContacts();
  const {
    transactionTypes,
    isLoading: isLoadingTypes,
    error: errorTypes,
    fetchTransactionTypes,
  } = useTransactionTypes();

  useEffect(() => {
    fetchTransactionTypes();
  }, [fetchTransactionTypes]);

  const handleItemClick = (item: NewAccountProps | NewContactProps) => {
    setActiveItem(item.id);
    setFormData(prev => ({
      ...prev,
      selectedAccount: item.id,
    }));
  };

  const isItemActive = (item: NewAccountProps | NewContactProps): boolean => {
    return item.id === activeItem;
  };

  const handleInputChange = (
    field: keyof TransactionFormData | 'tab',
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const favoriteContacts = contacts.filter(item => item.favorite);

  if (isLoadingContacts || isLoadingTypes) {
    return <div className="text-center p-8">Carregando contatos...</div>;
  }

  if (errorContacts || errorTypes) {
    return (
      <div className="text-center text-red-500 p-8">
        Erro ao carregar dados:{' '}
        {String(errorContacts || errorTypes || 'Erro desconhecido')}
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={e => handleFormSubmit(e, formData)}
        className="flex flex-col bg-white rounded-2xl max-lg:gap-6 lg:gap-8 max-xl:p-6 w-auto 2xl:w-1/2 lg:h-3/4 lg:p-8"
      >
        <Text variant="h2" weight="semibold">
          Nova transferência
        </Text>

        <div className="flex md:flex-row max-sm:flex-col gap-6">
          <Dropdown
            key={dropdownKey}
            label="Tipo de transferência"
            placeholder="Selecione o tipo de transação"
            items={transactionTypes}
            onValueChange={value =>
              handleInputChange('transactionType', value as Category)
            }
            width={'100%'}
          />

          <Input
            value={'R$ 5.000,00'}
            label="Saldo disponível"
            width={'100%'}
            disabled
          />
        </div>

        <Tabs
          value={formData.tab}
          onValueChange={value => handleInputChange('tab', value)}
        >
          <Tabs.List aria-label="Manage your account">
            <Tabs.Trigger label="Nova Conta" value="tab1" />
            <Tabs.Trigger label="Favoritos" value="tab2" />
            <Tabs.Trigger label="Meus Contatos" value="tab3" />
          </Tabs.List>

          <Tabs.Content value="tab1">
            <div className="flex flex-col pt-6">
              {newAccount.map(item => (
                <ListItem
                  key={item.id}
                  label={item.label}
                  isActive={isItemActive(item)}
                  onClick={() => handleItemClick(item)}
                />
              ))}
            </div>
          </Tabs.Content>

          <Tabs.Content value="tab2">
            <div className="flex flex-col gap-1 pt-6">
              {favoriteContacts.map(item => (
                <ContactListItem
                  key={item.id}
                  label={item.label}
                  isActive={isItemActive(item)}
                  isFavorite={item.favorite}
                  onClick={() => handleItemClick(item)}
                  onToggleFavorite={() => toggleFavorite(item.id)}
                />
              ))}
              {favoriteContacts.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  Nenhum contato favorito encontrado
                </div>
              )}
            </div>
          </Tabs.Content>

          <Tabs.Content value="tab3">
            <div className="flex flex-col gap-1 pt-6">
              {contacts.map(item => (
                <ContactListItem
                  key={item.id}
                  label={item.label}
                  isActive={isItemActive(item)}
                  isFavorite={item.favorite}
                  onClick={() => handleItemClick(item)}
                  onToggleFavorite={() => toggleFavorite(item.id)}
                />
              ))}
            </div>
          </Tabs.Content>
        </Tabs>

        <div className="pt-10">
          <Divider orientation="horizontal" />
        </div>

        <div className="flex md:flex-row max-sm:flex-col gap-6">
          <Input
            label="Data"
            type="date"
            value={formData.date}
            onChange={e => handleInputChange('date', e.target.value)}
            width={'100%'}
            required
          />
          <Input
            value={formData.amount}
            onChange={e => handleInputChange('amount', e.target.value)}
            label="Valor a ser transferido"
            type="number"
            width={'100%'}
            required
          />
        </div>

        <Button type="submit" width={'100%'} disabled={isSubmitting}>
          Realizar transferência
        </Button>
      </form>
      <Snackbar
        open={snackbar.open}
        onOpenChange={open => setSnackbar(prev => ({ ...prev, open }))}
        message={snackbar.message}
        variant={snackbar.variant}
        duration={5000}
        aria-live="polite"
      />
    </>
  );
};

export default Transactions;
