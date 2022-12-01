import { useUser } from '../../utils/useUser';
import { UserRole } from '../register/Register';

import Translate from './translate/Translate';
import Projects from './projects/Projects';

const PlatformRole: React.FC = () => {
  const { role } = useUser();
  
  return (
    <>
      { role === UserRole.CONTENT_OWNER && <Projects />}
      { role === UserRole.TRANSLATOR && <Translate />}
    </>
  );
};

export default PlatformRole;