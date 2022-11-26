type TitlePropsColor = 'text-slate-900' | 'text-white';
type TitlePropsSize = 'text-3xl' | 'text-4xl';
interface TitleProps {
  children: JSX.Element | string | undefined;
  color?: TitlePropsColor;
  size?: TitlePropsSize;
  className?: string;
};

const Title: React.FC<TitleProps> = ({ children, color = 'text-slate-900', size = 'text-4xl', className = '' }) => {
  return (
    <h1 className={`font-prompt font-semibold ${size} ${color} leading-normal ${className}`}>
      {children}
    </h1>
  );
};

export default Title;