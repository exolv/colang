import { Link } from 'react-router-dom';
import ProjectBox from '../../../components/ProjectBox';

const Projects: React.FC = () => {
  const date: number = Date.now();

  return (
    <div className='grid grid-cols-3 gap-6'>
      <ProjectBox id='1' title='colang Project' createDate={date} translations={[1, 2, 3]} />
      <ProjectBox id='1' title='munk Project' createDate={date} translations={[1, 2, 3, 4]} />
    </div>
  );
};

export default Projects;