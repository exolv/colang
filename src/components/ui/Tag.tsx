export type TagPropsColor = 'primary' | 'red' | 'green' | 'yellow' | 'gray';
const TagPropsColorMap = {
  primary: 'bg-indigo-50 text-indigo-500',
  red: 'bg-red-50 text-red-500',
  green: 'bg-green-50 text-green-500',
  yellow: 'bg-yellow-50 text-yellow-500',
  gray: 'bg-gray-100 text-gray-500'
};

export interface TagProps {
  children: React.ReactNode;
  className?: string;

  color?: TagPropsColor;
};

const Tag: React.FC<TagProps> = ({
  children,
  className = '',

  color = 'primary'
}) => {
  return (
    <div className={`inline-block rounded-full font-montserrat font-medium text-xs py-1 px-2.5 ${TagPropsColorMap[color]} ${className}`}>
      {children}
    </div>
  );
};

export default Tag;