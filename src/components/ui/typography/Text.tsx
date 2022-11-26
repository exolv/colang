type TextPropsSize = 'text-sm' | 'text-base' | 'text-md';
type TextPropsWeight = 'font-light' | 'font-normal' | 'font-medium' | 'font-semibold';
export type TextPropsColor = 'text-slate-500' | 'text-slate-700' | 'text-indigo-500' | 'text-red-500' | 'text-green-500';
interface TextProps {
  children: string | undefined;
  className?: string;
  size?: TextPropsSize;
  weight?: TextPropsWeight;
  color?: TextPropsColor;
  uppercase?: boolean;
};

const Text: React.FC<TextProps> = ({
  children,
  className = '',
  size = 'base',
  weight = 'font-light',
  color = 'text-slate-500',
  uppercase = false
}) => {
  return (
    <p className={`font-montserrat ${size} ${weight} ${uppercase ? 'uppercase' : ''} ${color} leading-normal ${className}`}>
      {children}
    </p>
  );
};

export default Text;