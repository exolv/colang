interface IconProps {
  children: JSX.Element;
  className?: string;
  bg?: string;
};

const Icon: React.FC<IconProps> = ({
  children,
  className = '',
  bg = 'bg-indigo-50'
}) => {
  return (
    <div className={`w-14 h-14 rounded-full flex justify-center items-center ${bg} ${className}`}>
      {children}
    </div>
  );
};

export default Icon;