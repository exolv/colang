type TitlePropsColor = 'text-slate-900' | 'text-white';
interface TitleProps {
  children: string;
  color: TitlePropsColor;
  className?: string;
};

const Title: React.FC<TitleProps> = ({ children, color = 'text-slate-900', className = '' }) => {
  return (
    <h1 className={`font-prompt font-semibold text-4xl ${color} leading-normal ${className}`}>
      {children}
    </h1>
  );
};

export default Title;