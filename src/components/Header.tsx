import Text from './ui/typography/Text';
import Title from './ui/typography/Title';

export interface HeaderProps {
  title: string;
  text: string;
  children?: JSX.Element;
};

const Header: React.FC<HeaderProps> = ({ title, text, children }) => {
  return (
    <div className='flex justify-between items-center mb-12'>
      <div>
        <Title>{title}</Title>
        <Text size='sm'>{text}</Text>
      </div>
      {children}
    </div>
  );
};

export default Header;