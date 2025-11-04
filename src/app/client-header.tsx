'use client';

import React, { useEffect, useState } from 'react';
import { Header, Loading } from '@grupo10-pos-fiap/design-system';
import { Avatar } from '@components/Avatar';
import NavDrawer from '@components/NavDrawer';
import { AvatarProps } from '@components/Avatar/interfaces';

export default function ClientHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AvatarProps | null>(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    fetch('http://localhost:3001/user')
      .then(res => res.json())
      .then(data => {
        if (data) setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;


  return (
    <>
      <Header
        logo={'/logo-black.svg'}
        avatar={
          <Avatar
            id={user!.id}
            name={user!.name}
            github={user!.github}
            email={user!.email}
          />
        }
      />
      <main className="flex max-sm:flex-col lg:gap-6 max-lg:gap-4 mt-30 lg:mx-20">
       <NavDrawer userName={user!.name} />
        {children}
      </main>
    </>
  );
}
