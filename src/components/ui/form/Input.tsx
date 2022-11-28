import React from 'react';
import { FieldError, FieldErrorsImpl, Merge, useController } from 'react-hook-form';

import Text, { TextPropsSize } from '../typography/Text';

export type InputPropsSize = 'lg' | 'base' | 'sm';
const InputPropsSizeMap = {
  lg: {
    ui: {
      wrapper: 'h-14',
      icon: 'w-14',
      input: 'text-base'
    },
    label: 'base',
    icon: 'w-6 h-6'
  },
  base: {
    ui: {
      wrapper: 'h-12',
      icon: 'w-12',
      input: 'text-sm'
    },
    label: 'sm',
    icon: 'w-5 h-5'
  },
  sm: {
    ui: {
      wrapper: 'h-10',
      icon: 'w-10',
      input: 'text-sm'
    },
    label: 'xs',
    icon: 'w-4 h-4'
  }
};

export type InputPropsType = 'text' | 'email' | 'password';

export interface InputProps {
  register: any;
  control: any;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  className?: string;

  type?: InputPropsType;
  placeholder?: string;
  name: string;
  label?: string;
  icon?: JSX.Element;
  size?: InputPropsSize;
};

const Input: React.FC<InputProps> = ({
  register,
  control,
  error,
  className = '',

  type = 'text',
  placeholder = '',
  name,
  label,
  icon,
  size = 'base'
}) => {
  let _icon;
  if (icon) {
    _icon = React.cloneElement(icon, {
      className: `${InputPropsSizeMap[size].icon} ${error ? 'text-red-400 group-hover:text-red-500 group-focus:text-red-500' : 'text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500'} transition-colors ease-linear`
    });
  }

  const { field, fieldState: { isDirty } } = useController({
    name,
    control
  });
  
  return (
    <div className={`${className}`}>
      {
        label &&
          <Text size={InputPropsSizeMap[size].label as TextPropsSize} weight='500' color='dark' className='mb-2 text-left'>{label}</Text>
      }
      <div className={`flex ${InputPropsSizeMap[size].ui.wrapper} overflow-hidden bg-white rounded-lg group border ${error ? 'border-red-200 hover:border-red-300 focus:border-red-300' : 'border-gray-200 hover:border-gray-300 focus:border-gray-300'} transition-colors ease-linear`}>
        {
          icon &&
            <div className={`bg-white ${InputPropsSizeMap[size].ui.icon} border-r ${error ? 'border-r-red-200 group-hover:border-r-red-300 group-focus:border-r-red-300' : 'border-r-gray-200 group-hover:border-r-gray-300 group-focus:border-r-gray-300'} transition-colors ease-linear flex flex-shrink-0 justify-center items-center`}>
              {_icon}
            </div>
        }
        <div className='flex w-full justify-start items-center bg-white'>
          <input
            {...register}
            type={type}
            placeholder={placeholder}
            className={`font-montserrat font-light bg-transparent p-4 ${InputPropsSizeMap[size].ui.input} ${error ? 'text-red-500 placeholder-red-500' : 'text-slate-700 placeholder-gray-400'} leading-none h-full w-full outline-none text-left`}
            autoComplete='off'
          />
        </div>
      </div>
      {
        type === 'password' && isDirty ?
          <ul className='mt-2 text-left'>
            <li className={`relative pl-6 before:absolute before:top-[9px] before:left-[7px] before:w-1.5 before:h-1.5 before:rounded-full ${/^.{8,}$/.test(field.value) ? 'before:bg-green-500' : 'before:bg-slate-500'}`}><Text size='sm' color='light'>Minimum 8 characters</Text></li>
            <li className={`relative pl-6 before:absolute before:top-[9px] before:left-[7px] before:w-1.5 before:h-1.5 before:rounded-full ${/^(?=.*[A-Z])/.test(field.value) ? 'before:bg-green-500' : 'before:bg-slate-500'}`}><Text size='sm' color='light'>At least one uppercase letter</Text></li>
            <li className={`relative pl-6 before:absolute before:top-[9px] before:left-[7px] before:w-1.5 before:h-1.5 before:rounded-full ${/^(?=.*[0-9])/.test(field.value) ? 'before:bg-green-500' : 'before:bg-slate-500'}`}><Text size='sm' color='light'>At least one number</Text></li>
            <li className={`relative pl-6 before:absolute before:top-[9px] before:left-[7px] before:w-1.5 before:h-1.5 before:rounded-full ${/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_])/.test(field.value) ? 'before:bg-green-500' : 'before:bg-slate-500'}`}><Text size='sm' color='light'>At least on special character</Text></li>
          </ul>
        :
          error && <Text size='sm' color='red' className='mt-2 text-left'>{error.message as string}</Text>
      }
    </div>
  );
};

export default Input;