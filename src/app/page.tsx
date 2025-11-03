'use client';
import NewTransactionsModal from '@components/NewTransactionsModal';
import { Button } from '@grupo10-pos-fiap/design-system';

export default function Home() {
  return (
    <div className="">
      <main className="">
        <NewTransactionsModal />
      </main>
    </div>
  );
}
