export interface NewAccountProps {
  id: string;
  label: string;
  children?: NewAccountProps[];
  isActive?: boolean;
}
