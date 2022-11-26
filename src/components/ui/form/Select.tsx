import { FieldError, useController } from 'react-hook-form';
import ReactSelect from 'react-select';
import { useId } from 'react';

import Text from '../typography/Text';

import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline';

export type SelectPropsOption = { value: string; label: string; };
interface SelectProps {
  control: any;
  error?: FieldError;
  name: string;
  label: string;
  icon?: JSX.Element;
  placeholder: string;
  className?: string;
  options: SelectPropsOption[];
  rules: any;
};

const Select: React.FC<SelectProps> = ({
  control,
  error,
  name,
  label,
  icon = <Bars3BottomLeftIcon className={`w-5 h-5 ${error ? 'text-red-400 group-hover:text-red-500 group-focus:text-red-500' : 'text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500'} transition-colors ease-linear`} />,
  placeholder,
  className = '',
  options,
  rules
}) => {
  const id = useId();

  const { field } = useController({
    name,
    control,
    rules
  });
  
  return (
    <div className={`${className}`}>
      <Text size='text-sm' weight='font-medium' color='text-slate-700' className='mb-2 text-left'>{label}</Text>
      <div className={`flex h-12 bg-white rounded-lg group border ${error ? 'border-red-200 hover:border-red-300 focus:border-red-300' : 'border-gray-200 hover:border-gray-300 focus:border-gray-300'} transition-colors ease-linear`}>
        <div className='bg-white rounded-l-lg w-12 flex flex-shrink-0 justify-center items-center'>
          {icon}
        </div>
        <div className='flex w-full justify-start items-center bg-white rounded-r-lg'>
          <ReactSelect
            ref={field.ref}
            instanceId={id}
            name={field.name}
            value={field.value}
            onBlur={field.onBlur}
            onChange={field.onChange}
            placeholder={placeholder}
            className={`font-montserrat bg-transparent pl-1 text-[14px] text-slate-700 leading-none h-full w-full outline-none`}
            options={options}
            styles={{
              control: (base) => ({
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
                textAlign: 'left'
              }),
              input: (base) => ({
                ...base,
                textAlign: 'left',
                height: '100%',
                margin: 0,
                padding: 0
              }),
              indicatorsContainer: (base) => ({
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
              menuList: (base) => ({
                ...base,
                textAlign: 'left',
                borderRadius: '0rem'
              })
            }}
          />
        </div>
      </div>
      {
        error && <Text size='text-sm' color='text-red-500' className='mt-2 text-left'>{error.message as string}</Text>
      }
    </div>
  );
};

export default Select;