export interface NewAccountProps {
  id: string;
  label: string;
  children?: NewAccountProps[];
  isActive?: boolean;
}

export const newAccount: NewAccountProps[] = [
  {
    id: 'mesma-titularidade',
    label: 'Mesma Titularidade',
  },
  {
    id: 'outra-titularidade',
    label: 'Outra Titularidade',
  },
];