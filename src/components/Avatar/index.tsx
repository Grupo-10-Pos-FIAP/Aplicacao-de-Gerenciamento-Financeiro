'use client';
import { ListItem } from '@grupo10-pos-fiap/design-system';
import { Avatar as RadixAvatar, DropdownMenu } from 'radix-ui';
import { AvatarProps } from './interfaces';

export function Avatar(user: AvatarProps) {
  function getInitials(name: string | null | undefined, maxInitials: number = 2): string {
  if (!name?.trim()) return '?';
  
  const words = name.trim().split(/\s+/).filter(word => word.length > 0);
  
  if (words.length === 0) return '?';
  
  return words
    .slice(0, maxInitials)
    .map(word => word.charAt(0).toUpperCase())
    .join('');
}
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <RadixAvatar.Root className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border border-gray-300">
          <RadixAvatar.Image
            src={`https://github.com/${user.github}.png`}
            alt="Avatar do usuário"
            className="w-full h-full object-cover"
          />
          <RadixAvatar.Fallback className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-600">
            {getInitials(user.name)}
          </RadixAvatar.Fallback>
        </RadixAvatar.Root>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          className="w-52 p-3 bg-white shadow-md rounded-lg overflow-hidden border border-gray-100"
        >
          <div className="flex flex-col items-center gap-4">
            <RadixAvatar.Root className="w-20 h-20 rounded-full overflow-hidden border border-gray-300">
              <RadixAvatar.Image
                src={`https://github.com/${user.github}.png`}
                alt="Avatar ampliado"
                className="w-full h-full object-cover"
              />
              <RadixAvatar.Fallback className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-600 text-xl">
                {getInitials(user.name)}
              </RadixAvatar.Fallback>
            </RadixAvatar.Root>
            <span className="mt-3 font-medium text-gray-800">{user.name}</span>
            <div className="flex flex-col w-full">
              <div className="w-full flex justify-center pr-2 pl-2 pt-3 pb-3">
                <div className="w-full h-px bg-gray-200"></div>
              </div>

              <DropdownMenu.Item className="px-4 py-3 text-red-600 text-sm font-medium hover:bg-red-50 cursor-pointer">
                <ListItem
                  label="Sair"
                  icon="LogOut"
                  onClick={() => alert('Saindo...')}
                />
              </DropdownMenu.Item>
            </div>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
