import Button from './ui/form/Button';
import Text from './ui/typography/Text';
import Title from './ui/typography/Title';

export interface HeaderProps {
  title: string;
  text: string;
  children?: JSX.Element;
};

const Header: React.FC<HeaderProps> = ({ title, text, children }) => {
  return (
    <div className='flex justify-between items-center mb-8'>
      <div>
        <Title size='text-3xl'>{title}</Title>
        <Text size='text-base'>{text}</Text>
      </div>
      {children}
    </div>
  );
};

export default Header;