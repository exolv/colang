import Text from './typography/Text';

export type ProgressPropsColor = 'primary' | 'white';
const ProgressPropsColorMap = {
  primary: {
    bar: 'bg-white',
    progress: 'bg-indigo-500'
  },
  white: {
    bar: 'bg-white/40',
    progress: 'bg-white'
  }
};

export interface ProgressProps {
  className?: string;

  percentage: number;
  color?: ProgressPropsColor;
  showPercentage?: boolean;
};

const Progress: React.FC<ProgressProps> = ({
  className = '',

  percentage,
  color = 'primary',
  showPercentage = false
}) => {
  return (
    <div className={`w-full ${className}`}>
      <Text size='base' color='white' weight='500' className='mb-1'>{percentage}%</Text>
      <div className={`rounded-md h-1 relative overflow-hidden ${ProgressPropsColorMap[color].bar}`}>
        <div style={{ width: `${percentage}%` }} className={`h-full ${ProgressPropsColorMap[color].progress}`}></div>
      </div>
    </div>
  );
};

export default Progress;