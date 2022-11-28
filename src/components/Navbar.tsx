import { ArrowRightOnRectangleIcon, Bars2Icon } from '@heroicons/react/24/outline';

import profile from '../assets/profile.svg';

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import supabase from '../utils/supabase';
import { useUser } from '../utils/useUser';
import Text from './ui/typography/Text';
import Avatar from './ui/Avatar';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { email, fullName } = useUser({ redirect: '/login' });

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const toggleMenu = () => {
    //
  };

  return (
    <div className='fixed top-0 left-0 right-0 w-full flex justify-between items-center py-4 px-8 bg-white z-40 border-b border-b-gray-200'>
      <div className='flex items-center'>
        <div className='w-8 h-8 flex justify-center items-center cursor-pointer mr-8' onClick={toggleMenu}>
          <Bars2Icon className='w-5 h-5 text-gray-500' />
        </div>
        <Link to='/'>
          <img src='/colang-logo.svg' alt='' width={90} />
        </Link>
      </div>
      <div className='flex items-center'>
        <div className='flex items-center gap-2'>
          <Text size='sm' color='dark'>{fullName !== null ? fullName : email}</Text>
          <Avatar size='sm' profiles={[ profile ]} />
        </div>
        <div className='w-8 h-8 flex justify-center items-center cursor-pointer ml-8' onClick={signOut}>
          <ArrowRightOnRectangleIcon className='w-5 h-5 text-gray-500' />
        </div>
      </div>
    </div>
  );
};

export default Navbar;