import { ListItem } from "@grupo10-pos-fiap/design-system";
import * as Avatar from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { UserMenuProps } from "./interfaces";

function getInitials(fullName: string): string {
  return fullName
    .trim()
    .split(" ")
    .filter(Boolean)
    .map(word => word[0].toUpperCase())
    .join("");
}

export function UserMenu(user: UserMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Avatar.Root className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border border-gray-300">
          <Avatar.Image
            src={`https://github.com/${user.github}.png`}
            alt="Avatar do usuário"
            className="w-full h-full object-cover"
          />
          <Avatar.Fallback className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-600">
            {getInitials(user.name)}
          </Avatar.Fallback>
        </Avatar.Root>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          className="w-52 !p-3 bg-white shadow-md rounded-lg overflow-hidden border border-gray-100"
        >
          <div className="flex flex-col items-center gap-4">
            <Avatar.Root className="w-20 h-20 rounded-full overflow-hidden border border-gray-300">
              <Avatar.Image
                src={`https://github.com/${user.github}.png`}
                alt="Avatar ampliado"
                className="w-full h-full object-cover"
              />
              <Avatar.Fallback className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-600 text-xl">
                {getInitials(user.name)}
              </Avatar.Fallback>
            </Avatar.Root>
            <span className="mt-3 font-medium text-gray-800">{user.name}</span>
            <div className="flex flex-col w-full">
                <div className="w-full flex justify-center !pr-2 !pl-2 !pt-3 !pb-3">
                    <div className="w-full h-px bg-gray-200"></div>
                </div>

                <DropdownMenu.Item
                    className="px-4 py-3 text-red-600 text-sm font-medium hover:bg-red-50 cursor-pointer"
                >
                    <ListItem label="Sair" icon="LogOut" onClick={() => alert("Saindo...")} />
                </DropdownMenu.Item>
            </div>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}