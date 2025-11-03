'use client';

import React from 'react';
import { Header } from '@grupo10-pos-fiap/design-system';
import Avatar from '@components/Avatar';
import NavDrawer from '@components/NavDrawer';

export default function ClientHeader({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <Header
        logo={'/logo-black.svg'}
        avatar={<Avatar />}
      />
      <main className="flex max-sm:flex-col lg:gap-6 max-lg:gap-4 mt-30 lg:mx-20">
        <NavDrawer />
        {children}
      </main>
    </>
  );
}
