import { Bars3Icon, GlobeEuropeAfricaIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Header from '../../../components/Header';
import ProjectBox from '../../../components/ProjectBox';
import Alert, { AlertProps } from '../../../components/ui/Alert';
import Button from '../../../components/ui/form/Button';
import Input from '../../../components/ui/form/Input';
import Select, { SelectPropsOption } from '../../../components/ui/form/Select';
import Modal from '../../../components/ui/Modal';

type ProjectData = {
  title: string;
  language: SelectPropsOption;
};

const Projects: React.FC = () => {
  const date: number = Date.now();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertProps>();

  const [newProjectModal, setNewProjectModal] = useState(false);

  const { register, control, handleSubmit, formState: { errors, isValid } } = useForm<ProjectData>({ mode: 'onTouched' });

  const submitCreateProject = async (projectData: ProjectData, e: any) => {
    e.preventDefault();
    
    setLoading(true);
    console.log(projectData);
    
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitCreateProject)} autoComplete='off' noValidate>
        <Modal
          color='primary'
          title='Create a new project'
          buttons={[
            <Button color='gray' flat onClick={() => setNewProjectModal(!newProjectModal)}>Close</Button>,
            <Button type='submit' loading={loading} disabled={!isValid || loading}>Create project</Button>
          ]}
          toggled={newProjectModal}
          toggleChange={(toggle: boolean) => setNewProjectModal(toggle)}
          className='w-[30%]'
          content={
            <>
              <Input
                register={register('title', {
                  required: 'This field is required.'
                })}
                control={control}
                error={errors.title}
                type='text'
                name='title'
                label='Title'
                placeholder='Project title'
                icon={<Bars3Icon />}
                className='mb-6'
              />
              <Select
                control={control}
                error={errors.language}
                name='language'
                label='Language'
                icon={<GlobeEuropeAfricaIcon />}
                placeholder='Project language'
                options={[
                  { value: 'RO', label: 'Romania' },
                  { value: 'DE', label: 'Germany' },
                  { value: 'ES', label: 'Spain' }
                ]}
                rules={{ required: 'This field is required.' }}
              />
              {
                alert && !loading &&
                  <Alert type={alert.type} title={alert.title} className='mt-6'>{alert.children}</Alert>
              }
            </>
          }
        >Lorem ipsum dolor amet simena eldunt.</Modal>
      </form>


      <Header title='Projects' text='Explore your available projects or create a new one.'>
        <Button icon={<PlusIcon />} onClick={() => setNewProjectModal(!newProjectModal)}>New project</Button>
      </Header>
      
      <div className='grid xl:grid-cols-4 lg:grid-cols-3 gap-6'>
        <ProjectBox id='1' title='colang Project' createDate={date} translations={[1, 2, 3]} />
        <ProjectBox id='2' title='munk Project' createDate={date} translations={[1, 2, 3, 4]} />
      </div>
    </>
  );
};

export default Projects;