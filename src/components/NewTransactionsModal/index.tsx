import React, { useState } from 'react';
import ContactListItem from '@components/ContactListItem';
import {
  Dropdown,
  Text,
  Tabs,
  Divider,
  Button,
  Input,
  ListItem,
} from '@grupo10-pos-fiap/design-system';
import { newAccount, NewAccountProps } from '@const/newAccount';
import { newContact, NewContactProps } from '@const/newContact';

interface FormData {
  transactionType: string;
  selectedAccount: string;
  amount: string;
  tab: string;
}

const NewTransactionsModal: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    transactionType: '',
    selectedAccount: '',
    amount: '',
    tab: 'tab1'
  });

  const [activeItem, setActiveItem] = useState<string>('');
  const [contacts, setContacts] = useState<NewContactProps[]>(newContact);

  const handleItemClick = (item: NewAccountProps | NewContactProps) => {
    setActiveItem(item.id);
    setFormData(prev => ({
      ...prev,
      selectedAccount: item.id
    }));
  };

  const isItemActive = (item: NewAccountProps | NewContactProps): boolean => {
    return item.id === activeItem;
  };

  const handleToggleFavorite = (contactId: string) => {
    setContacts(prevContacts => 
      prevContacts.map(contact => 
        contact.id === contactId 
          ? { ...contact, favorite: !contact.favorite }
          : contact
      )
    );
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações básicas
    if (!formData.transactionType) {
      alert('Selecione o tipo de transação');
      return;
    }

    if (!formData.selectedAccount) {
      alert('Selecione uma conta');
      return;
    }

    if (!formData.amount) {
      alert('Informe o valor da transferência');
      return;
    }

    // Aqui você faria a submissão dos dados
    console.log('Dados do formulário:', formData);
    
    // Lógica para enviar para API, etc.
    // await api.submitTransaction(formData);
    
    alert('Transação realizada com sucesso!');
  };

  // Filtrar contatos favoritos
  const favoriteContacts = contacts.filter(item => item.favorite);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col bg-white rounded-2xl max-lg:gap-6 lg:gap-8 max-xl:p-6 w-full lg:h-3/4 lg:p-8">
      <Text variant="h2" weight="semibold">
        Nova transferência
      </Text>
      
      <Dropdown
        placeholder="Selecione o tipo de transação"
        items={[
          { label: 'Câmbio de Moeda', value: 'cambio-moeda' },
          { label: 'DOC/TED', value: 'doc-ted' },
          { label: 'Empréstimo e Financiamento', value: 'emprestimo-financimento' },
        ]}
        onValueChange={(value) => handleInputChange('transactionType', value)}
        width={'100%'}
      />

      <Tabs value={formData.tab} onValueChange={(value) => handleInputChange('tab', value)}>
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
                onToggleFavorite={() => handleToggleFavorite(item.id)}
              />
            ))}
            {/* Mensagem quando não há favoritos */}
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
                onToggleFavorite={() => handleToggleFavorite(item.id)}
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
        onChange={(e) => handleInputChange('amount', e.target.value)}
        label="Valor a ser transferido" 
        width={'100%'}
        required
      />
      
      <Button type="submit" width={'100%'}>
        Concluir transação
      </Button>
    </form>
  );
};

export default NewTransactionsModal;