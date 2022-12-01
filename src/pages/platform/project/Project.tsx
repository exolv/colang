import { ArrowLeftIcon, ChartBarIcon, EllipsisHorizontalIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link, useParams } from 'react-router-dom';
import { useRole } from '../../../utils/useRole';
import { UserRole } from '../../register/Register';
import { useState } from 'react';

import Header from '../../../components/Header';
import Text from '../../../components/ui/typography/Text';
import { Dropdown, DropdownItem } from '../../../components/ui/Dropdown';
import Button from '../../../components/ui/form/Button';
import Progress from '../../../components/ui/Progress';

const Project: React.FC = () => {
  const { validRole } = useRole({ checkRole: UserRole.CONTENT_OWNER, redirect: '/platform' });
  
  const { id } = useParams();

  const [dropdownToggled, setDropdownToggled] = useState(false);
  
  return (
    <>
      { validRole &&
        <>
          <Link to='/platform' className='inline-flex items-center mb-4'>
            <ArrowLeftIcon className='w-4 h-4 text-gray-500 mr-3' />
            <Text size='sm'>Projects</Text>
          </Link>

          <Header title='colang Project' text={`This project has 3 translations in 5 languages.`}>
            <>
              <div className='relative group'>
                <Button className='rounded-full !bg-gray-100 hover:bg-gray-100 w-8 h-8 !p-0' onClick={() => setDropdownToggled(!dropdownToggled)}><EllipsisHorizontalIcon className='w-6 h-6 text-gray-500' /></Button>
                <Dropdown toggled={dropdownToggled}>
                  <DropdownItem icon={<EyeIcon />}>View</DropdownItem>
                  <DropdownItem icon={<PencilIcon />}>Edit</DropdownItem>
                  <DropdownItem icon={<TrashIcon />}>Delete</DropdownItem>
                </Dropdown>
              </div>
            </>
          </Header>

          <div className='grid grid-cols-3 gap-12'>
            <div className='col-span-2'>
              {id}
            </div>
            <div className='col-span-1'>
              <div className='rounded-lg bg-indigo-500 px-5 py-4'>
                <Text size='xs' color='white' className='opacity-70 mb-2'>Analytics</Text>
                <Text size='base' color='white' weight='600'>This project is 80% translated.</Text>
                <div className='flex items-center gap-x-3 mt-6'>
                  <ChartBarIcon className='w-6 h-6 text-white/40' />
                  <Progress color='white' percentage={80} showPercentage />
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default Project;