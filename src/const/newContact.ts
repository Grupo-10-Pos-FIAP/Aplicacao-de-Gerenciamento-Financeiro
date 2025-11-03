export interface NewContactProps {
  id: string;
  label: string;
  favorite: boolean
  children?: NewContactProps[];
  isActive?: boolean;
}

export const newContact: NewContactProps[] = [
  {
    id: '1',
    label: 'Maria Silva',
    favorite: true
  },
  {
    id: '2',
    label: 'João Santos',
    favorite: false
  },
  {
    id: '3',
    label: 'Ana Oliveira',
    favorite: true
  },
  {
    id: '4',
    label: 'Pedro Costa',
    favorite: true
  },
  {
    id: '5',
    label: 'Carla Rodrigues',
    favorite: false
  },
];