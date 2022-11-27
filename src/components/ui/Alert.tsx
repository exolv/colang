import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import Text, { TextPropsColor } from './typography/Text';

export type AlertPropsType = 'success' | 'error' | 'warning' | 'info';
const AlertPropsTypeMap = {
  success: {
    ui: 'bg-green-50 border-green-500',
    text: 'green',
    icon: <CheckCircleIcon className='w-5 h-5 text-green-500' />
  },
  error: {
    ui: 'bg-red-50 border-red-500',
    text: 'red',
    icon: <XCircleIcon className='w-5 h-5 text-red-500' />
  },
  warning: {
    ui: 'bg-yellow-50 border-yellow-500',
    text: 'yellow',
    icon: <ExclamationCircleIcon className='w-5 h-5 text-yellow-500' />
  },
  info: {
    ui: 'bg-indigo-50 border-indigo-500',
    text: 'primary',
    icon: <InformationCircleIcon className='w-5 h-5 text-indigo-500' />
  }
};

export interface AlertProps {
  children: string;
  className?: string;

  type?: AlertPropsType;
  title: string;
};

const Alert: React.FC<AlertProps> = ({
  children,
  className = '',

  type = 'info',
  title
}) => {
  return (
    <div className={`w-fit rounded-lg border ${AlertPropsTypeMap[type].ui} p-4 ${className}`}>
      <div className='flex items-start'>
        <div className='mr-3 mt-px'>{AlertPropsTypeMap[type].icon}</div>
        <div>
          <Text size='sm' color={AlertPropsTypeMap[type].text as TextPropsColor} weight='500' className='mb-1'>{title}</Text>
          <Text size='sm' color='light'>{children}</Text>
        </div>
      </div>
    </div>
  );
};

export default Alert;