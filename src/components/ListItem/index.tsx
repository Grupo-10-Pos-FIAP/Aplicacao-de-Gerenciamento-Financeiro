import { Icon, IconProps, Text } from '@grupo10-pos-fiap/design-system';
import React from 'react';


interface ListItemProps {
  label: string;
  icon?: IconProps['name'];
  isActive?: boolean;
  onClick: () => void;
}


const ListItem: React.FC<ListItemProps> = ({ 
  label, 
  icon, 
  isActive = false, 
  onClick 
}) => {
  return (
    <div
      className={`flex items-center justify-between w-full mt-2 rounded-lg transition-colors cursor-pointer group ${
        isActive ? 'text-blue-600' : 'text-gray-700 hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 flex-1">
        {icon && (
          <Icon
            name={icon}
            size="extra-small"
            color={isActive ? 'primary' : 'base'}
          />
        )}
        <Text
          color={isActive ? 'primary' : 'gray-700'}
          variant="body"
          className="font-medium"
        >
          {label}
        </Text>
      </div>

      <Icon
        name="ChevronRight"
        size="extra-small"
        color={isActive ? 'primary' : 'base'}
      />
    </div>
  );
};

export default ListItem;