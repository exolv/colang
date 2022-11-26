import { FieldError, useController } from 'react-hook-form';

import Text from '../typography/Text';

import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline';

type InputPropsType = 'text' | 'email' | 'password';
interface InputProps {
  register: any;
  control: any;
  error?: FieldError;
  type: InputPropsType;
  name: string;
  label: string;
  icon?: JSX.Element;
  placeholder: string;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  register,
  control,
  error,
  type = 'text',
  name,
  label,
  icon = <Bars3BottomLeftIcon className={`w-5 h-5 ${error ? 'text-red-400 group-hover:text-red-500 group-focus:text-red-500' : 'text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500'} transition-colors ease-linear`} />,
  placeholder,
  className = ''
}) => {
  const { field, fieldState: { isDirty } } = useController({
    name,
    control
  });
  
  return (
    <div className={`${className}`}>
      <Text size='text-sm' weight='font-medium' color='text-slate-700' className='mb-2 text-left'>{label}</Text>
      <div className={`flex h-12 overflow-hidden bg-white rounded-lg group border ${error ? 'border-red-200 hover:border-red-300 focus:border-red-300' : 'border-gray-200 hover:border-gray-300 focus:border-gray-300'} transition-colors ease-linear`}>
        <div className='bg-white w-12 flex flex-shrink-0 justify-center items-center'>
          {icon}
        </div>
        <div className='flex w-full justify-start items-center bg-white'>
          <input
            {...register}
            type={type}
            placeholder={placeholder}
            className={`font-montserrat bg-transparent pl-1 pr-4 text-[14px] text-slate-700 leading-none h-full w-full outline-none text-left`}
            autoComplete='off'
          />
        </div>
      </div>
      {
        type === 'password' && isDirty ?
          <ul className='mt-2 text-left'>
            <li className={`relative pl-6 before:absolute before:top-[7px] before:left-[7px] before:w-1.5 before:h-1.5 before:rounded-full ${/^.{8,}$/.test(field.value) ? 'before:bg-green-500' : 'before:bg-slate-500'}`}><Text size='text-sm' color='text-slate-500'>Minimum 8 characters</Text></li>
            <li className={`relative pl-6 before:absolute before:top-[7px] before:left-[7px] before:w-1.5 before:h-1.5 before:rounded-full ${/^(?=.*[A-Z])/.test(field.value) ? 'before:bg-green-500' : 'before:bg-slate-500'}`}><Text size='text-sm' color='text-slate-500'>At least one uppercase letter</Text></li>
            <li className={`relative pl-6 before:absolute before:top-[7px] before:left-[7px] before:w-1.5 before:h-1.5 before:rounded-full ${/^(?=.*[0-9])/.test(field.value) ? 'before:bg-green-500' : 'before:bg-slate-500'}`}><Text size='text-sm' color='text-slate-500'>At least one number</Text></li>
            <li className={`relative pl-6 before:absolute before:top-[7px] before:left-[7px] before:w-1.5 before:h-1.5 before:rounded-full ${/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_])/.test(field.value) ? 'before:bg-green-500' : 'before:bg-slate-500'}`}><Text size='text-sm' color='text-slate-500'>At least on special character</Text></li>
          </ul>
        :
          error && <Text size='text-sm' color='text-red-500' className='mt-2 text-left'>{error.message as string}</Text>
      }
    </div>
  );
};

export default Input;