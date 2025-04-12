import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';

export async function logoutAction() {
  'use server';
  const cookiesStore = await cookies();
  cookiesStore.delete('apiKey');
  redirect('/login');
}

export async function Header() {
  const cookiesStore = await cookies();

  const isAuthPage = cookiesStore.get('apiKey')?.value !== undefined;

  return (
    <header className="border-b border-gray-800 bg-[#1a2332] p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white">
          Full Cycle Gateway
        </Link>

        {isAuthPage && (
          <div className="flex items-center gap-4">
            <span className="text-gray-300">Olá, usuário</span>
            <form action={logoutAction}>
              <Button variant="destructive" size="sm" className="flex items-center gap-1">
                <LogOut size={16} />
                Logout
              </Button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
