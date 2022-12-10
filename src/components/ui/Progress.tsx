import Text, { TextPropsColor } from './typography/Text';

export type ProgressPropsColor = 'primary' | 'white';
const ProgressPropsColorMap = {
  primary: {
    bar: 'bg-indigo-100',
    progress: 'bg-indigo-500',
    percentage: 'dark'
  },
  white: {
    bar: 'bg-white/40',
    progress: 'bg-white',
    percentage: 'white'
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
      { showPercentage && 
        <div className='mb-1 flex justify-between'>
          <Text size='xs' color={ProgressPropsColorMap[color].percentage as TextPropsColor}>Progress</Text>
          <Text size='xs' color={ProgressPropsColorMap[color].percentage as TextPropsColor}>{percentage}%</Text>
        </div>
      }
      <div className={`rounded-md h-1 relative overflow-hidden ${ProgressPropsColorMap[color].bar}`}>
        <div style={{ width: `${percentage}%` }} className={`h-full ${ProgressPropsColorMap[color].progress}`}></div>
      </div>
    </div>
  );
};

export default Progress;