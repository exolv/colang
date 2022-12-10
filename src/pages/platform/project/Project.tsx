import { useState } from 'react';
import { ArrowLeftIcon, ChartBarIcon, DocumentTextIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { Link, useParams } from 'react-router-dom';
import { useRole } from '../../../utils/useRole';
import { UserRole } from '../../register/Register';

import profile from '../../../assets/profile.svg';

import Header from '../../../components/Header';
import Text from '../../../components/ui/typography/Text';
import Progress from '../../../components/ui/Progress';
import Avatar from '../../../components/ui/Avatar';
import Button from '../../../components/ui/form/Button';
import supabase from '../../../utils/supabase';

const Project: React.FC = () => {
  const { validRole } = useRole({ checkRole: UserRole.CONTENT_OWNER, redirect: '/platform' });
  
  const { id } = useParams();

  const [isFileLoading, setFileLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (e: any) => {
    setFileLoading(true);

    const fileReader = new FileReader();
    fileReader.onload = onFileLoad;
    fileReader.readAsText(e.target.files[0]);
    setFileName(e.target.files[0]?.name);
  };

  const onFileLoad = async (e: any) => {
    const data = JSON.parse(e.target.result);
    setTimeout(() => {
      setFileLoading(false);
    }, 3000);

    // setFileLoading(false);
  };
  
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
              
            </>
          </Header>

          <div className='grid grid-cols-2'>
            { false ?
                <>
                  <div></div>
                  <div></div>
                </>
              :
                <div>
                  <div className='flex items-center mb-4'>
                    <InformationCircleIcon className='w-5 h-5 text-slate-700 mr-3' />
                    <Text color='dark' size='base' weight='600'>Import source language JSON</Text>
                  </div>
                  <Text size='sm' weight='300' className='mb-4'>You have to import the JSON file of the source language translation, so this will be the starting point for the translators of your project.</Text>
                  <div className='flex justify-between items-end gap-6'>
                    <div className='relative overflow-hidden inline-block group'>
                      <form autoComplete='off' noValidate>
                        <input type='file' className='absolute top-0 right-0 bottom-0 left-0 w-full h-full opacity-0 cursor-pointer' onChange={(e: any) => handleFileUpload(e)} />
                        <Button icon={<DocumentTextIcon />} className='group-hover:bg-indigo-600' disabled={isFileLoading} loading={isFileLoading}>Import JSON file</Button>
                      </form>
                    </div>
                    { isFileLoading &&
                      <div className='w-full'>
                        <Text>Uploading {fileName}</Text>
                        <Progress percentage={80} />
                      </div>
                    }
                  </div>
                </div>
            }

            {/* <div className='rounded-lg bg-indigo-500 px-5 py-4 mb-10'>
              <Text size='xs' color='white' className='opacity-70 mb-2'>Analytics</Text>
              <Text size='base' color='white' weight='600'>This project is 80% translated.</Text>
              <div className='flex items-center gap-x-3 mt-6'>
                <ChartBarIcon className='w-6 h-6 text-white/40' />
                <Progress color='white' percentage={80} showPercentage />
              </div>
            </div>
            <div className='mb-10'>
              <Text size='base' color='dark' weight='600' className='mb-4'>Contributors</Text>
              <div className='grid grid-cols-2'>
                <div className='flex items-center'>
                  <Avatar size='sm' profiles={[
                    profile,
                    profile,
                    profile
                  ]} />
                </div>
                <div className='flex items-center justify-end'>
                  <div className='flex flex-col items-center'>
                    <Text color='dark' size='lg' weight='600'>23+</Text>
                    <Text color='light' size='xs'>languages</Text>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </>
      }
    </>
  );
};

export default Project;