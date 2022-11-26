interface TagProps {
  children: React.ReactNode;
  className?: string;
  bg?: string;
  color?: string;
};

const Tag: React.FC<TagProps> = ({
  children,
  className = '',
  bg = 'bg-indigo-50',
  color = 'text-indigo-500'
}) => {
  return (
    <div className={`inline-block rounded-full font-montserrat font-medium text-xs py-1 px-2.5 ${bg} ${color} ${className}`}>
      {children}
    </div>
  );
};

export default Tag;