import React from 'react';
import { useId } from 'react';
import { FieldError, FieldErrorsImpl, Merge, useController } from 'react-hook-form';
import ReactSelect from 'react-select';

import Text, { TextPropsSize } from '../typography/Text';

export type SelectPropsOption = { value: string; label: string; };

export type SelectPropsSize = 'lg' | 'base' | 'sm';
const SelectPropsSizeMap = {
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

export interface SelectProps {
  control: any;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  rules: any;
  className?: string;

  placeholder?: string;
  name: string;
  label?: string;
  icon?: JSX.Element;
  size?: SelectPropsSize;
  options: SelectPropsOption[];
};

const Select: React.FC<SelectProps> = ({
  control,
  error,
  rules,
  className = '',

  placeholder = '',
  name,
  label,
  icon,
  size = 'base',
  options
}) => {
  let _icon;
  if (icon) {
    _icon = React.cloneElement(icon, {
      className: `${SelectPropsSizeMap[size].icon} ${error ? 'text-red-400 group-hover:text-red-500 group-focus:text-red-500' : 'text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500'} transition-colors ease-linear`
    });
  }

  const id = useId();

  const { field } = useController({
    name,
    control,
    rules
  });
  
  return (
    <div className={`${className}`}>
      {
        label &&
          <Text size={SelectPropsSizeMap[size].label as TextPropsSize} weight='500' color='dark' className='mb-2 text-left'>{label}</Text>
      }
      <div className={`flex ${SelectPropsSizeMap[size].ui.wrapper} bg-white rounded-lg group border ${error ? 'border-red-200 hover:border-red-300 focus:border-red-300' : 'border-gray-200 hover:border-gray-300 focus:border-gray-300'} transition-colors ease-linear`}>
        {
          icon &&
            <div className={`bg-white ${SelectPropsSizeMap[size].ui.icon} rounded-l-lg border-r ${error ? 'border-r-red-200 group-hover:border-r-red-300 group-focus:border-r-red-300' : 'border-r-gray-200 group-hover:border-r-gray-300 group-focus:border-r-gray-300'} transition-colors ease-linear flex flex-shrink-0 justify-center items-center`}>
              {_icon}
            </div>
        }
        <div className={`flex w-full justify-start items-center bg-white ${icon ? 'rounded-r-lg' : 'rounded-lg'}`}>
          <ReactSelect
            ref={field.ref}
            instanceId={id}
            name={field.name}
            value={field.value}
            onBlur={field.onBlur}
            onChange={field.onChange}
            placeholder={placeholder}
            className={`font-montserrat font-light bg-transparent pl-4 ${SelectPropsSizeMap[size].ui.input} ${error ? 'text-red-500 placeholder-red-500' : 'text-slate-700 placeholder-gray-400'} leading-none h-full w-full outline-none text-left`}
            options={options}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: 'rgb(99 102 241)',
                primary25: 'rgb(238 242 255)',
                primary50: 'rgb(199 210 254)',
                primary75: 'rgb(129 140 248)'
              }
            })}
            styles={{
              control: (base, state) => ({
                ...base,
                border: 'none',
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: '0.5rem',
                borderBottomRightRadius: '0.5rem',
                boxShadow: 'none',
                height: '100%',
                width: '100%',
                outline: 'none'
              }),
              valueContainer: (base) => ({
                ...base,
                textAlign: 'left',
                height: '100%',
                margin: 0,
                padding: 0
              }),
              placeholder: (base) => ({
                ...base,
                margin: 0,
                textAlign: 'left',
                color: error ? 'rgb(239 68 68)' : 'rgb(156 163 175)'
              }),
              input: (base) => ({
                ...base,
                textAlign: 'left',
                height: '100%',
                margin: 0,
                padding: 0
              }),
              indicatorsContainer: (base, state) => ({
                ...base,
                width: '3rem'
              }),
              indicatorSeparator: (base, state) => ({
                ...base,
                marginRight: '0.25rem',
                backgroundColor: error ? 
                    (state.isFocused ? 'rgb(252 165 165)' : 'rgb(254 202 202)')
                  :
                    (state.isFocused ? 'rgb(209 213 219)' : 'rgb(229 231 235)')
              }),
              menu: (base) => ({
                ...base,
                borderRadius: '0.5rem',
                left: '-1px',
                width: 'calc(100% + 2px)',
                boxShadow: 'none',
                border: '1px solid rgb(229 231 235)',
                overflow: 'hidden'
              }),
              menuList: (base) => ({
                ...base,
                textAlign: 'left',
                borderRadius: '0rem',
                color: 'rgb(51 65 85)',
                padding: 0
              }),
              option: (base) => ({
                ...base,
                padding: '0.75rem 1rem'
              })
            }}
          />
        </div>
      </div>
      {
        error && <Text size='sm' color='red' className='mt-2 text-left'>{error.message as string}</Text>
      }
    </div>
  );
};

export default Select;