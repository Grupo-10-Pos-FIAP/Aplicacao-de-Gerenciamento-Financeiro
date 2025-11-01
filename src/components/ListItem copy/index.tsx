import {
  Icon,
  IconButton,
  IconProps,
  Text,
} from '@grupo10-pos-fiap/design-system';
import React from 'react';

interface ListItemProps {
  label: string;
  icon?: IconProps['name'];
  isActive?: boolean;
  onClick: () => void;
}

const ContactListItem: React.FC<ListItemProps> = ({
  label,
  isActive = false,
  onClick,
}) => {
  return (
    <div
      className={`flex items-center justify-between w-full mt-2 rounded-lg transition-colors cursor-pointer text-gray-700 hover:bg-gray-100`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 flex-1">
        <IconButton
          icon="Heart"
          variant='outline'
          size="sm"
          color={'base'}
          aria-label={'contato'}
          onClick={() => {}}
        />

        <Text
          color='gray-700'
          variant="body"
          className="font-medium"
        >
          {label}
        </Text>
      </div>

      <IconButton
        icon="Heart"
        size="sm"
        color={isActive ? 'primary' : 'base'}
        aria-label={'contato'}
        onClick={() => {}}
      />
    </div>
  );
};

export default ContactListItem;
