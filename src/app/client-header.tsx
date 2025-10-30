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
    <React.Fragment>
      <Header
        logo={'/logo-black.svg'}
        avatar={<Avatar />}
      />
      <main className="min-h-screen flex gap-4 mt-8 ml-20">
        <NavDrawer />
        {children}
      </main>
    </React.Fragment>
  );
}
