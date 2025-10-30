import React, { useState } from 'react';
import {
  Divider,
  Icon,
  IconProps,
  Text,
} from '@grupo10-pos-fiap/design-system';
import { getFullFormattedDate } from '@utils/date.utils';
import { useRouter } from 'next/navigation';

interface NavItem {
  id: string;
  label: string;
  icon: IconProps['name'];
  path?: string;
  children?: NavItem[];
  isActive?: boolean;
}

const SimpleNavDrawer: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
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

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleItemClick = (item: NavItem) => {
    if (item.children) {
      toggleExpand(item.id);
    } else {
      setActiveItem(item.id);
      console.log('Navegando para:', item.path);
      router.push(item.path || '/');
    }
  };

  const isItemActive = (item: NavItem): boolean => {
    if (item.id === activeItem) return true;

    if (item.children) {
      return item.children.some(child => isItemActive(child));
    }

    return false;
  };

  const renderNavItem = (item: NavItem) => {
    const isActive = isItemActive(item);

    return (
      <div key={item.id} className="w-full">
        <div
          className={`flex items-center justify-between w-full mt-2 rounded-lg transition-colors cursor-pointer group ${
            isActive ? 'text-blue-600' : 'text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => handleItemClick(item)}
        >
          <div className="flex items-center gap-3 flex-1">
            <Icon
              name={item.icon}
              size="extra-small"
              color={isActive ? 'primary' : 'base'}
            />
            <Text
              color={isActive ? 'primary' : 'gray-700'}
              variant="body"
              className="font-medium"
            >
              {item.label}
            </Text>
          </div>

          <Icon
            name="ChevronRight"
            size="extra-small"
            color={isActive ? 'primary' : 'base'}
          />
        </div>
      </div>
    );
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

      <div className="flex-1 p-4">
        <Divider orientation="horizontal" />
        <div className="flex flex-col gap-1">
          {navItems.map(item => renderNavItem(item))}
        </div>
      </div>
    </div>
  );
};

export default SimpleNavDrawer;
