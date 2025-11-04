import { API_CONFIG } from './api';
import { NewContactProps } from '@const/newContact';
import { handleFetchError, fetchWithTimeout } from './apiUtils';

interface ApiContact {
  id: number;
  name: string;
  favorite: boolean;
}

export async function getContacts(): Promise<NewContactProps[]> {
  try {
    const response = await fetchWithTimeout(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACTS}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error('Falha ao buscar contatos');
    }

    const data: ApiContact[] = await response.json();
    return data.map(contact => ({
      id: String(contact.id),
      label: contact.name,
      favorite: contact.favorite,
    }));
  } catch (error) {
    handleFetchError(error);
  }
}

export async function updateContactFavorite(
  contactId: string,
  isFavorite: boolean,
  contactName: string
): Promise<void> {
  try {
    const updatedContact = {
      name: contactName,
      favorite: isFavorite,
    };

    const response = await fetchWithTimeout(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACT_BY_ID(contactId)}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContact),
      }
    );

    if (!response.ok) {
      throw new Error('Falha ao atualizar o contato favorito.');
    }
  } catch (error) {
    handleFetchError(error);
  }
}
