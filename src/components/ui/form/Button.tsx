import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { MouseEventHandler } from 'react';

type ButtonPropsFontSize = 'text-sm' | 'text-md';
type ButtonPropsPadding = 'px-10 py-3' | 'px-6 py-0';
interface ButtonProps {
  children: string;
  className?: string;
  bg?: string;
  color?: string;
  fontSize?: ButtonPropsFontSize;
  padding: ButtonPropsPadding;
  full?: boolean;
  spinner?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

interface SpinnerProps {
  color?: string;
  className?: string;
};
const Spinner: React.FC<SpinnerProps> = ({ color = 'text-white', className = '' }) => {
  return (
    <ArrowPathIcon className={`w-5 h-5 ${color} ${className}`} />
  );
};

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  bg = 'bg-indigo-500 hover:bg-indigo-600',
  color = 'text-white',
  fontSize = 'text-sm',
  padding = 'px-10 py-3',
  full = false,
  spinner = false,
  disabled,
  onClick = undefined
}) => {
  return (
    <button
      className={`flex items-center ${bg} ${full ? 'w-full' : ''} ${padding} h-12 rounded-lg ${className} ${disabled ? 'opacity-50' : ''} transition-colors ease-linear`}
      disabled={disabled}
      onClick={onClick}
    >
      {
        spinner && <Spinner color={color} className='mr-3 animate-spin' />
      }
      <span className={`font-montserrat font-medium ${color} ${fontSize}`}>{children}</span>
    </button>
  );
};

export default Button;