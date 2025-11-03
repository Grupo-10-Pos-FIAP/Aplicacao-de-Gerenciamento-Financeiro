import React, { useState } from 'react';
import ContactListItem from '@components/ContactListItem';
import {
  Dropdown,
  Text,
  Tabs,
  Icon,
  Divider,
  Button,
  Input,
  ListItem,
} from '@grupo10-pos-fiap/design-system';
import { newAccount, NewAccountProps } from '@const/newAccount';

const NewTransactionsModal: React.FC = () => {
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
    <div className="flex flex-col bg-white rounded-2xl max-lg:gap-6 lg:gap-8 max-xl:p-6 w-full lg:h-3/4 lg:p-8">
      <Text variant="h2" weight="semibold">
        Nova transferência
      </Text>
        <Dropdown
          placeholder="Selecione o tipo de transação"
          items={[
            { label: 'Câmbio de Moeda', value: 'cambio-moeda' },
            { label: 'DOC/TED', value: 'doc-ted' },
            {
              label: 'Empréstimo e Financiamento',
              value: 'emprestimo-financimento',
            },
          ]}
          width={'100%'}
        />

        
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
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

      <Input value={'R$ '} label="Valor a ser transferido" width={'100%'} />
      <Button type="submit" width={'100%'}>
        Concluir transação
      </Button>
    </div>
  );
};

export default NewTransactionsModal;
