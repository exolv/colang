import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Header from '../../../components/Header';
import Button from '../../../components/ui/form/Button';
import { useRole } from '../../../utils/useRole';
import { UserRole } from '../../register/Register';

const Translate: React.FC = () => {
  const { validRole } = useRole({ checkRole: UserRole.TRANSLATOR, redirect: '/platform' });
  
  return (
    <>
      { validRole &&
        <>
          <Header title='Translations' text='Explore your available translations or search for other.'>
            <Button icon={<MagnifyingGlassIcon />}>Search</Button>
          </Header>
        </>
      }
    </>
  );
};

export default Translate;