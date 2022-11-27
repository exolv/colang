import React from 'react';
import { MouseEventHandler } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export type ButtonPropsType = 'button' | 'submit';

export type ButtonPropsColor = 'primary' | 'red' | 'green' | 'yellow' | 'gray' | 'dark';
const ButtonPropsColorMap = {
  primary: {
    regular: 'bg-indigo-500 hover:bg-indigo-600 border-indigo-500 hover:border-indigo-600 text-white',
    flat: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-50 hover:border-indigo-100 text-indigo-500 hover:text-indigo-600',
    outlined: 'bg-transparent border border-indigo-500 hover:border-indigo-600 text-indigo-500 hover:text-indigo-600'
  },
  red: {
    regular: 'bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600 text-white',
    flat: 'bg-red-50 hover:bg-red-100 border-red-50 hover:border-red-100 text-red-500 hover:text-red-600',
    outlined: 'bg-transparent border border-red-500 hover:border-red-600 text-red-500 hover:text-red-600'
  },
  green: {
    regular: 'bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600 text-white',
    flat: 'bg-green-50 hover:bg-green-100 border-green-50 hover:border-green-100 text-green-500 hover:text-green-600',
    outlined: 'bg-transparent border border-green-500 hover:border-green-600 text-green-500 hover:text-green-600'
  },
  yellow: {
    regular: 'bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 text-white',
    flat: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-50 hover:border-yellow-100 text-yellow-500 hover:text-yellow-600',
    outlined: 'bg-transparent border border-yellow-500 hover:border-yellow-600 text-yellow-500 hover:text-yellow-600'
  },
  gray: {
    regular: 'bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600 text-white',
    flat: 'bg-gray-100 hover:bg-gray-200 border-gray-100 hover:border-gray-200 text-gray-500 hover:text-gray-600',
    outlined: 'bg-transparent border border-gray-500 hover:border-gray-600 text-gray-500 hover:text-gray-600'
  },
  dark: {
    regular: 'bg-slate-800 hover:bg-slate-900 border-slate-800 hover:border-slate-900 text-white',
    flat: 'bg-slate-100 hover:bg-slate-100 border-slate-100 hover:border-slate-100 text-slate-800 hover:text-slate-900',
    outlined: 'bg-transparent border border-slate-800 hover:border-slate-900 text-slate-800 hover:text-slate-900'
  }
};
const ButtonPropsShadowMap = {
  primary: 'shadow-md shadow-indigo-500/50',
  red: 'shadow-md shadow-red-500/50',
  green: 'shadow-md shadow-green-500/50',
  yellow: 'shadow-md shadow-yellow-500/50',
  gray: 'shadow-md shadow-gray-500/50',
  dark: 'shadow-md shadow-slate-800/50',
};

export type ButtonPropsSize = 'lg' | 'base' | 'sm';
const ButtonPropsSizeMap = {
  lg: {
    ui: 'px-7 py-3',
    text: 'text-base',
    icon: 'w-7 h-7'
  },
  base: {
    ui: 'px-7 py-3',
    text: 'text-sm',
    icon: 'w-5 h-5'
  },
  sm: {
    ui: 'px-6 py-2.5',
    text: 'text-xs',
    icon: 'w-4 h-4'
  }
};

export interface ButtonProps {
  children: React.ReactNode;
  className?: string;

  type?: ButtonPropsType;
  size?: ButtonPropsSize;
  color?: ButtonPropsColor;
  shadow?: boolean;
  flat?: boolean;
  outlined?: boolean;
  full?: boolean;
  icon?: JSX.Element;
  loading?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',

  type = 'button',
  size = 'base',
  color = 'primary',
  shadow = false,
  flat = false,
  outlined = false,
  full = false,
  icon,
  loading = false,
  disabled = false,
  onClick
}) => {
  let _icon;
  if (icon) {
    _icon = React.cloneElement(icon, {
      className: `${ButtonPropsSizeMap[size].icon} mr-3`
    });
  }

  return (
    <button
      type={type}
      className={`flex items-center justify-center ${full ? 'w-full' : ''} ${ButtonPropsColorMap[color][flat && !outlined ? 'flat' : (!flat && outlined ? 'outlined' : 'regular')]} ${shadow ? ButtonPropsShadowMap[color] : ''} ${ButtonPropsSizeMap[size].ui} rounded-lg ${disabled ? 'opacity-50' : ''} transition-colors ease-linear ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {
        !loading && _icon
      }
      {
        loading && <ArrowPathIcon className={`${ButtonPropsSizeMap[size].icon} mr-3 animate-spin`} />
      }
      <span className={`font-montserrat font-medium ${ButtonPropsSizeMap[size].text}`}>{children}</span>
    </button>
  );
};

export default Button;