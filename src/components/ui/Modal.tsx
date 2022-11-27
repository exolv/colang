import React from 'react';
import Icon from './Icon';
import Text from './typography/Text';

export type ModalPropsColor = 'primary' | 'red' | 'green' | 'yellow' | 'gray';

export interface ModalProps {
  children: React.ReactNode;
  className?: string;

  color?: ModalPropsColor;
  title: string;
  content?: React.ReactNode;
  icon?: JSX.Element;
  buttons?: React.ReactNode[];
  toggled?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  children,
  className = '',

  color = 'primary',
  title,
  content,
  icon,
  buttons = [],
  toggled = false
}) => {
  return (
    <div className={`fixed w-full h-full top-0 right-0 button-0 left-0 flex justify-center items-center bg-slate-900/30 z-50 ${toggled ? 'block' : 'hidden'}`}>
      <div className={`font-montserrat bg-white rounded-xl max-w-1/2 p-10 flex flex-col justify-center text-center ${className}`}>
        {
          icon &&
            <div className='flex justify-center mb-8'>
              {
                <Icon size='lg' color={color}>{icon}</Icon>
              }
            </div>
        }
        <Text color='dark' weight='500' className='mb-2'>{title}</Text>
        <Text size='sm' weight='300'>{children}</Text>
        {
          content && <div className='mt-8'>{content}</div>
        }
        <div className='flex justify-center gap-4 mt-8'>
          {
            buttons.map(button => button)
          }
        </div>
      </div>
    </div>
  );
};

export default Modal;