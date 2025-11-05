import { useState, useEffect } from 'react';
import { NewContactProps } from '@/types/newContact';
import { getContacts, updateContactFavorite } from '@/services/contactService';
import { useFetch } from './useFetch';

export const useContacts = () => {
  const {
    data: contacts,
    loading: isLoading,
    error,
    fetchData: fetchContacts,
  } = useFetch(getContacts, []);
  const [localContacts, setLocalContacts] = useState<NewContactProps[]>([]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  useEffect(() => {
    setLocalContacts(contacts);
  }, [contacts]);

  const toggleFavorite = async (contactId: string, isFavorite: boolean) => {
    const contact = localContacts.find(c => c.id === contactId);
    if (!contact) return;

    const newFavoriteStatus = !isFavorite;

    try {
      await updateContactFavorite(contactId, newFavoriteStatus, contact.label);

      setLocalContacts(prevContacts =>
        prevContacts.map(c =>
          c.id === contactId ? { ...c, favorite: newFavoriteStatus } : c
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
    }
  };

  return { contacts: localContacts, isLoading, error, toggleFavorite };
};
