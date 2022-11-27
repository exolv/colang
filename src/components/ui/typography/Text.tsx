export type TextPropsSize = 'lg' | 'base' | 'sm' | 'xs';
const TextPropsSizeMap = {
  lg: 'text-lg',
  base: 'text-base',
  sm: 'text-sm',
  xs: 'text-xs'
};

export type TextPropsColor = 'dark' | 'light' | 'primary' | 'red' | 'green' | 'yellow';
const TextPropsColorMap = {
  dark: 'text-slate-700',
  light: 'text-slate-500',
  primary: 'text-indigo-500',
  red: 'text-red-500',
  green: 'text-green-500',
  yellow: 'text-yellow-500'
};

export type TextPropsWeight = '600' | '500' | '400' | '300';
const TextPropsWeightMap = {
  '600': 'font-semibold',
  '500': 'font-medium',
  '400': 'font-normal',
  '300': 'font-light'
};

export interface TextProps {
  children: React.ReactNode;
  className?: string;

  size?: TextPropsSize;
  color?: TextPropsColor;
  weight?: TextPropsWeight;
};

const Text: React.FC<TextProps> = ({
  children,
  className = '',

  size = 'base',
  color = 'light',
  weight = '400'
}) => {
  return (
    <p className={`font-montserrat leading-normal ${TextPropsSizeMap[size]} ${TextPropsColorMap[color]} ${TextPropsWeightMap[weight]} ${className}`}>
      {children}
    </p>
  );
};

export default Text;