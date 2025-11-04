import { useState, useEffect, useCallback } from 'react';
import { NewContactProps } from '@/types/newContact';
import { getContacts, updateContactFavorite } from '@/services/contactService';

export const useContacts = () => {
  const [contacts, setContacts] = useState<NewContactProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const formattedContacts = await getContacts();
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

    const newFavoriteStatus = !contact.favorite;

    try {
      await updateContactFavorite(contactId, newFavoriteStatus, contact.label);

      setContacts(prevContacts =>
        prevContacts.map(c =>
          c.id === contactId ? { ...c, favorite: newFavoriteStatus } : c
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
    }
  };

  return { contacts, isLoading, error, toggleFavorite };
};
