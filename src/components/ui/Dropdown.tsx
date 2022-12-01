import React, { MouseEventHandler, useEffect, useState } from 'react';
import Text from './typography/Text';

export interface DropdownProps {
  children: React.ReactNode;
  className?: string;

  toggled?: boolean;
};

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  className = '',

  toggled = false
}) => {
  const [_toggled, setToggled] = useState(toggled);

  useEffect(() => {
    setToggled(toggled);
  }, [toggled]);

  return (
    <div className={`absolute mt-3 -left-2 min-w-[200px] rounded-lg bg-white border border-gray-200 ${_toggled ? 'block' : 'hidden'} ${className} dropdown before:w-3 before:h-3 before:bg-white before:border-t before:border-r before:transform before:-rotate-45 before:border-gray-200 before:content-[''] before:absolute before:-top-[6px] before:left-[17px]`}>
      {children}
    </div>
  );
};


export interface DropdownItemProps {
  children: React.ReactNode;
  className?: string;

  icon?: JSX.Element;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  className = '',

  icon,
  onClick
}) => {
  let _icon;
  if (icon) {
    _icon = React.cloneElement(icon, {
      className: `w-4 h-4 mr-4`
    });
  }

  return (
    <div className={`flex items-center px-4 py-2.5 bg-white hover:bg-gray-50 cursor-pointer font-montserrat leading-normal text-sm text-slate-700 first-of-type:rounded-t-lg last-of-type:rounded-lg ${className}`}>
      {_icon}{children}
    </div>
  );
};