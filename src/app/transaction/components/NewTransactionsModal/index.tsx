import React, { useState, useEffect } from 'react';
import ContactListItem from '@/components/ContactListItem';
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
import { newAccount } from '@/const/newAccount';
import type { NewAccountProps } from '@/types/newAccount';
import type { NewContactProps } from '@/types/newContact';
import { useContacts } from '@/hooks/useContacts';
import { useTransactionTypes } from '@/app/transaction/hooks/useTransactionTypes';
import {
  useTransactionFormSubmission,
  TransactionFormData,
} from '@app/transaction/hooks/useTransactionFormSubmission';
import type { Category } from '@/types/transaction';

interface LocalFormData extends Omit<TransactionFormData, 'transactionType'> {
  selectedAccount: string;
  transactionType: Category | '';
  amount: string;
  date: string;
  tab: string;
}

const NewTransactionsModal: React.FC = () => {
  const [formData, setFormData] = useState<LocalFormData>({
    transactionType: '',
    selectedAccount: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    tab: 'tab1',
  });

  const [dropdownKey, setDropdownKey] = useState(0);
  const resetForm = () => {
    setFormData({
      transactionType: '',
      selectedAccount: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
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

  const handleInputChange = (field: keyof LocalFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const favoriteContacts = contacts.filter(item => item.favorite);

  if (isLoadingContacts || isLoadingTypes) {
    return <div className="text-center p-8">Carregando...</div>;
  }

  if (errorContacts || errorTypes) {
    return (
      <div className="text-center text-red-500 p-8">
        Erro ao carregar dados.
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={e => handleFormSubmit(e, formData)}
        className="flex flex-col bg-white rounded-2xl max-lg:gap-6 lg:gap-8 max-xl:p-6 w-full lg:p-8"
      >
        <Text variant="h2" weight="semibold">
          Nova transferência
        </Text>

        <Dropdown
          key={dropdownKey}
          placeholder="Selecione o tipo de transferência"
          items={transactionTypes}
          onValueChange={value =>
            handleInputChange('transactionType', value as Category)
          }
          width={'100%'}
        />

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
                  onToggleFavorite={() =>
                    toggleFavorite(item.id, item.favorite)
                  }
                />
              ))}
              {/*  quando não há favoritos */}
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
                  onToggleFavorite={() =>
                    toggleFavorite(item.id, item.favorite)
                  }
                />
              ))}
            </div>
          </Tabs.Content>
        </Tabs>

        <div className="pt-15">
          <Divider orientation="horizontal" />
        </div>

        <Input
          value={formData.amount}
          onChange={e => handleInputChange('amount', e.target.value)}
          label="Valor a ser transferido"
          width={'100%'}
          required
        />

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

export default NewTransactionsModal;
