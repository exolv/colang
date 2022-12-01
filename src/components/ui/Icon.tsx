import React from 'react';

export type IconPropsColor = 'primary' | 'red' | 'green' | 'yellow' | 'gray';
const IconPropsColorMap = {
  primary: {
    ui: 'bg-indigo-50',
    icon: 'text-indigo-500'
  },
  red: {
    ui: 'bg-red-50',
    icon: 'text-red-500'
  },
  green: {
    ui: 'bg-green-50',
    icon: 'text-green-500'
  },
  yellow: {
    ui: 'bg-yellow-50',
    icon: 'text-yellow-500'
  },
  gray: {
    ui: 'bg-gray-100',
    icon: 'text-gray-500'
  }
};

export type IconPropsSize = 'lg' | 'base' | 'sm';
const IconPropsSizeMap = {
  lg: {
    ui: 'w-20 h-20',
    icon: 'w-16 h-16'
  },
  base: {
    ui: 'w-14 h-14',
    icon: 'w-11 h-11'
  },
  sm: {
    ui: 'w-8 h-8',
    icon: 'w-6 h-6'
  }
};

export interface IconProps {
  children: JSX.Element;
  className?: string;

  color?: IconPropsColor;
  size?: IconPropsSize;
};

const Icon: React.FC<IconProps> = ({
  children,
  className = '',

  color = 'primary',
  size = 'base'
}) => {
  const _children = React.cloneElement(children, {
    className: `${IconPropsColorMap[color].icon} ${IconPropsSizeMap[size].icon}`
  });

  return (
    <div className={`rounded-full flex justify-center items-center ${IconPropsColorMap[color].ui} ${IconPropsSizeMap[size].ui} ${className}`}>
      {_children}
    </div>
  );
};

export default Icon;