'use client';
import ListItem from '@components/ListItem';
import ContactListItem from '@components/ListItem copy';
import {
  Dropdown,
  Text,
  Tabs,
  Icon,
  Divider,
  Button,
  Input
} from '@grupo10-pos-fiap/design-system';
import React, { useState } from 'react';

interface NewAccountProps {
  id: string;
  label: string;
  children?: NewAccountProps[];
  isActive?: boolean;
}

const newAccount: NewAccountProps[] = [
  {
    id: 'mesma-titularidade',
    label: 'Mesma Titularidade',
  },
  {
    id: 'outra-titularidade',
    label: 'Outra Titularidade',
  },
];

const Transactions: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [activeItem, setActiveItem] = useState<string>('');

  const handleItemClick = (item: NewAccountProps) => {
    setActiveItem(item.id);
  };

  const isItemActive = (item: NewAccountProps): boolean => {
    if (item.id === activeItem) return true;

    return false;
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl max-lg:gap-4 max-xl:p-6 min-lg:w-3/4 min-lg:h-3/4 min-lg:gap-6 min-lg:p-10">
      <Text variant="title">Nova transferência</Text>
      <div className="flex flex-row gap-10">
        <Dropdown
          label="Valor a ser transferido"
          placeholder="Selecione o tipo de transação"
          items={[
            { label: 'Câmbio de Moeda', value: 'cambio-moeda' },
            { label: 'DOC/TED', value: 'doc-ted' },
            { label: 'Empréstimo e Financiamento', value: 'emprestimo-financimento' },
          ]}
        />

        <Input value={'R$ 5.000,00'} label="Saldo disponível" disabled />
      </div>
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <Tabs.List aria-label="Manage your account">
          <Tabs.Trigger label="Nova Conta" value="tab1" />
          <Tabs.Trigger label="Favoritos" value="tab2" />
          <Tabs.Trigger label="Meus Contatos" value="tab3" />
        </Tabs.List>
        <Tabs.Content value="tab1">
          <div className="flex flex-col gap-1 pt-6">
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
            {newAccount.map(item => (
              <ContactListItem
                key={item.id}
                label={item.label}
                isActive={isItemActive(item)}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </div>
        </Tabs.Content>
        <Tabs.Content value="tab3">
          <div className="flex flex-col gap-1 pt-6">
            {newAccount.map(item => (
              <ContactListItem
                key={item.id}
                label={item.label}
                isActive={isItemActive(item)}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </div> 
        </Tabs.Content>
      </Tabs>

      <div className="pt-15">
        <Divider orientation="horizontal" />
      </div>

      <div className="flex gap-6">
        <Input
          label="Data"
          type='date'
        />{' '}
        <Input
          value={'R$ '}
          label="Valor a ser transferido"
        />
      </div>
      <Button type='submit' width={'100%'}>Concluir transação</Button>
    </div>
  );
};

export default Transactions;
