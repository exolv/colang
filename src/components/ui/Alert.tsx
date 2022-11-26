import { InformationCircleIcon } from '@heroicons/react/24/outline';

import Text, { TextPropsColor } from './typography/Text';

type AlertDataType = 'SUCCESS' | 'ERROR' | 'WARNING' | 'INFO';
export interface AlertData {
  status: AlertDataType;
  title: string;
  message: string;
};
interface AlertProps {
  children: string;
  className?: string;
  bg?: string;
  border?: string;
  color?: string;
  icon?: JSX.Element;
  title: string;
};

const Alert: React.FC<AlertProps> = ({
  children,
  className = '',
  bg = 'bg-indigo-50',
  border = 'border-indigo-500',
  color = 'text-indigo-500',
  icon = <InformationCircleIcon className={`w-5 h-5 text-indigo-500`} />,
  title
}) => {
  return (
    <div className={`font-montserrat text-[14px] rounded-lg ${bg} border ${border} p-4 ${className}`}>
      <div className='flex items-start'>
        <div className='mr-3'>{icon}</div>
        <div>
          <Text size='text-sm' color={color as TextPropsColor} weight='font-medium' className='mb-1'>{title}</Text>
          <Text size='text-sm' color='text-slate-500'>{children}</Text>
        </div>
      </div>
    </div>
  );
};

export default Alert;