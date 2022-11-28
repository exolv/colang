import { Outlet } from 'react-router-dom';
import { useUser } from '../../utils/useUser';

import Navbar from '../../components/Navbar';

const Platform: React.FC = () => {
  const { isLoggedIn } = useUser({ redirect: '/login' });

  return (
    <>
      { isLoggedIn && 
        <>
          <Navbar />

          <div className='px-72 pb-8 pt-32'>
            <Outlet />
          </div>
        </>
      }
    </>
  );
};

export default Platform;
