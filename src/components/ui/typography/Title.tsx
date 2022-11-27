export type TitlePropsSize = 'lg' | 'base' | 'sm';
const TitlePropsSizeMap = {
  lg: 'text-4xl',
  base: 'text-3xl',
  sm: 'text-2xl'
};

export interface TitleProps {
  children: React.ReactNode;
  className?: string;

  size?: TitlePropsSize;
};

const Title: React.FC<TitleProps> = ({
  children,
  className = '',

  size = 'base'
}) => {
  return (
    <h1 className={`font-prompt font-semibold leading-normal ${TitlePropsSizeMap[size]} ${className}`}>
      {children}
    </h1>
  );
};

export default Title;