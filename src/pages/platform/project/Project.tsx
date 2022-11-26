import { ArrowLeftIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { Link, useParams } from 'react-router-dom';

import Header from '../../../components/Header';
import Button from '../../../components/ui/form/Button';
import Icon from '../../../components/ui/Icon';
import Text from '../../../components/ui/typography/Text';

const Project: React.FC = () => {
  const { id } = useParams();

  const toggleMenu = () => {
    //
  };
  
  return (
    <>
      <Link to='/platform' className='inline-flex items-center mb-4'>
        <ArrowLeftIcon className='w-4 h-4 text-gray-500 mr-3' />
        <Text size='text-sm'>Platform</Text>
      </Link>

      <Header title='colang Project' text='This project has 3 translations in 5 languages.'>
        <Icon bg='bg-gray-100'>
          <EllipsisHorizontalIcon className='w-10 h-10 text-gray-500' />
        </Icon>
      </Header>

      <div>{id}</div>
    </>
  );
};

export default Project;