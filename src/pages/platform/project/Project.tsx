import { ArrowLeftIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { Link, useParams } from 'react-router-dom';
import { useUser } from '../../../utils/useUser';

import Header from '../../../components/Header';
import Button from '../../../components/ui/form/Button';
import Icon from '../../../components/ui/Icon';
import Text from '../../../components/ui/typography/Text';

const Project: React.FC = () => {
  const { role } = useUser();

  const { id } = useParams();
  
  return (
    <>
      <Link to='/projects' className='inline-flex items-center mb-4'>
        <ArrowLeftIcon className='w-4 h-4 text-gray-500 mr-3' />
        <Text size='sm'>Projects</Text>
      </Link>

      <Header title='colang Project' text={`This project has 3 translations in 5 languages.`}>
        <Icon size='sm' color='gray' className='cursor-pointer'><EllipsisHorizontalIcon /></Icon>
      </Header>

      <div>{id} {role}</div>
    </>
  );
};

export default Project;