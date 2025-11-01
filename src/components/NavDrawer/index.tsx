import React, { useState } from 'react';
import {
  Divider,
  Icon,
  IconProps,
  Text,
} from '@grupo10-pos-fiap/design-system';
import { getFullFormattedDate } from '@utils/date.utils';
import { useRouter } from 'next/navigation';
import ListItem from '@components/ListItem';

interface NavItem {
  id: string;
  label: string;
  icon?: IconProps['name'];
  path?: string;
  children?: NavItem[];
  isActive?: boolean;
}


const SimpleNavDrawer: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('home');

  const router = useRouter();

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Início',
      icon: 'House',
      path: '',
    },
    {
      id: 'transaction',
      label: 'Transação',
      icon: 'Repeat',
      path: '/transaction',
    },
  ];

  const handleItemClick = (item: NavItem) => {
    setActiveItem(item.id);
    console.log('Navegando para:', item.path);
    router.push(item.path || '/');
  };

  const isItemActive = (item: NavItem): boolean => {
    if (item.id === activeItem) return true;

    return false;
  };

  return (
    <div className="w-80 h-screen overflow-y-auto flex flex-col">
      <div className="flex flex-col gap-2 pb-4">
        <Text color="base" variant="h1" className="font-bold">
          Bem-vindo, usuário
        </Text>
        <Text color="gray-700" variant="small">
          {getFullFormattedDate()}
        </Text>
      </div>

      <div className="flex-1 pt-4">
        <Divider orientation="horizontal" />
        <div className="flex flex-col gap-1">
          {navItems.map(item => (
            <ListItem
              key={item.id}
              label={item.label}
              icon={item.icon}
              isActive={isItemActive(item)}
              onClick={() => handleItemClick(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimpleNavDrawer;