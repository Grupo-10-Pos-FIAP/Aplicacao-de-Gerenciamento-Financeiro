export interface NewContactProps {
  id: string;
  label: string;
  favorite: boolean;
  children?: NewContactProps[];
  isActive?: boolean;
}
