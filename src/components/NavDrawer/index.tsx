import React, { useState, useEffect } from 'react';
import {
  Divider,
  Icon,
  IconProps,
  Text,
  ListItem,
  Tabs,
} from '@grupo10-pos-fiap/design-system';
import { getFullFormattedDate } from '@utils/date.utils';
import { useRouter, usePathname } from 'next/navigation';
import Home from '@app/page';
import Transactions from '@app/transaction/page';

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
  const [selectedTab, setSelectedTab] = useState<string>('tab1');
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Início',
      icon: 'House',
      path: '/',
    },
    {
      id: 'transaction',
      label: 'Transação',
      icon: 'Repeat',
      path: '/transaction',
    },
  ];

  // Detecta se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sincroniza o estado com a rota atual - CORREÇÃO AQUI
  useEffect(() => {
    // Verifica se o pathname inclui a rota de transaction
    if (pathname.includes('/transaction')) {
      setActiveItem('transaction');
      setSelectedTab('tab2');
    } else {
      setActiveItem('home');
      setSelectedTab('tab1');
    }
  }, [pathname]);

  const handleItemClick = (item: NavItem) => {
    // Apenas para desktop - muda a rota
    if (!isMobile) {
      setActiveItem(item.id);
      console.log('Navegando para:', item.path);
      router.push(item.path || '/');
    }
  };

  const handleTabChange = (tabValue: string) => {
    // Apenas para mobile - muda a rota
    if (isMobile) {
      setSelectedTab(tabValue);

      if (tabValue === 'tab1') {
        setActiveItem('home');
        router.push('/');
      } else if (tabValue === 'tab2') {
        setActiveItem('transaction');
        router.push('/transaction');
      }
    }
  };

  const isItemActive = (item: NavItem): boolean => {
    return item.id === activeItem;
  };

  // Renderização para MOBILE - usa apenas tabs com roteamento
  if (isMobile) {
    return (
      <div className='shrink-0'>
        <Tabs value={selectedTab} onValueChange={handleTabChange} width="100%">
          <Tabs.List aria-label="Navegação principal">
            <Tabs.Trigger label="Início" value="tab1" />
            <Tabs.Trigger label="Transação" value="tab2" />
          </Tabs.List>
        </Tabs>
      </div>
    );
  }

  // Renderização para DESKTOP - usa navegação lateral + roteamento
  return (
    <div className="flex h-screen">
      {/* Sidebar de navegação */}
      <div className="w-64 shrink-0">
        <div className="flex flex-col gap-2 p-4 pb-4">
          <Text color="base" variant="h1" weight="semibold">
            Bem-vindo, usuário
          </Text>
          <Text color="gray700" variant="small">
            {getFullFormattedDate()}
          </Text>
        </div>

        <Divider orientation="horizontal" />

        <div className="p-2">
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
