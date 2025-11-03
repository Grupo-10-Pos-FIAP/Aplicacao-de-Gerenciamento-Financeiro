import {
  Icon,
  IconButton,
  IconProps,
  Input,
  Text,
} from '@grupo10-pos-fiap/design-system';
import React from 'react';

interface ContactListItemProps {
  label: string;
  icon?: IconProps['name'];
  isActive?: boolean;
  isFavorite?: boolean;
  onClick: () => void;
  onToggleFavorite?: () => void;
}

const ContactListItem: React.FC<ContactListItemProps> = ({
  label,
  isActive = false,
  isFavorite = false,
  onClick,
  onToggleFavorite,
}) => {
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impede que o clique propague para o item
    onToggleFavorite?.();
  };

  return (
    <div
      className={`flex items-center justify-between w-full pt-0.5`}
      onClick={onClick}
    >
      <Input
        type="radio"
        label={label}
        className="label"
      />

      <IconButton
        icon={isFavorite ? 'HeartFilled' : 'Heart'}
        size="small"
        color={isFavorite ? 'primary' : 'base'}
        aria-label={isFavorite ? 'Favorito' : 'Não favorito'}
        onClick={handleToggleFavorite}
      />
    </div>
  );
};

export default ContactListItem;
