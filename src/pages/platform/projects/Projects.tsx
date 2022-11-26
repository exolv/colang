import Header from '../../../components/Header';
import ProjectBox from '../../../components/ProjectBox';
import Button from '../../../components/ui/form/Button';

const Projects: React.FC = () => {
  const date: number = Date.now();

  return (
    <>
      <Header title='Projects' text='Explore your available projects or create a new one.'>
        <Button bg='bg-indigo-500 hover:bg-indigo-600' color='text-white' fontSize='text-sm' padding='px-6 py-0' className='shadow-md shadow-indigo-500/50'>New project</Button>
      </Header>
      
      <div className='grid grid-cols-3 gap-6'>
        <ProjectBox id='1' title='colang Project' createDate={date} translations={[1, 2, 3]} />
        <ProjectBox id='1' title='munk Project' createDate={date} translations={[1, 2, 3, 4]} />
      </div>
    </>
  );
};

export default Projects;