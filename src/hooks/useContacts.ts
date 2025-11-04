import { useState, useEffect, useCallback } from 'react';
import { NewContactProps } from '@const/newContact';

export const useContacts = () => {
  const [contacts, setContacts] = useState<NewContactProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/contacts');
      if (!response.ok) {
        throw new Error('Falha ao buscar contatos');
      }
      const data = await response.json();
      const formattedContacts = data.map(
        (contact: { id: number; name: string; favorite: boolean }) => ({
          id: String(contact.id),
          label: contact.name,
          favorite: contact.favorite,
        })
      );
      setContacts(formattedContacts);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Ocorreu um erro desconhecido')
      );
      console.error('Erro ao buscar contatos:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const toggleFavorite = async (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    if (!contact) return;

    const updatedContact = {
      ...contact,
      label: undefined,
      favorite: !contact.favorite,
      name: contact.label,
    };

    try {
      const response = await fetch(`/api/contacts/${contactId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContact),
      });

      if (response.ok) {
        setContacts(prevContacts =>
          prevContacts.map(c =>
            c.id === contactId ? { ...c, favorite: !c.favorite } : c
          )
        );
      }
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
    }
  };

  return { contacts, isLoading, error, toggleFavorite };
};
