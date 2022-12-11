import { useState } from 'react';
import supabase from '../../../utils/supabase';
import { ArrowLeftIcon, ChartBarIcon, DocumentTextIcon, InformationCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useRole } from '../../../utils/useRole';
import useSWR from 'swr';

import profile from '../../../assets/profile.svg';

import Header from '../../../components/Header';
import Text from '../../../components/ui/typography/Text';
import Progress from '../../../components/ui/Progress';
import Avatar from '../../../components/ui/Avatar';
import Button from '../../../components/ui/form/Button';
import Alert, { AlertProps } from '../../../components/ui/Alert';
import { UserRole } from '../../register/Register';
import Input from '../../../components/ui/form/Input';

const Project: React.FC = () => {
  const { validRole } = useRole({ checkRole: UserRole.CONTENT_OWNER, redirect: '/platform' });
  const navigate = useNavigate();
  const { id } = useParams();


  const [loaded, setLoaded] = useState(false);
  const fetchProjectSourceTranslation = async () => {
    const { data, error } = await supabase.storage.from('translations').createSignedUrl(
      `sources/${id}.json`,
      30
    );
    
    if (error) {
      navigate('/platform');
      return [];
    }

    const json = await (await fetch(data.signedUrl)).json();
    if (json) {
      setLoaded(true);
      return json;
    }

    return undefined;
  };
  
  const { data } = useSWR('/getProjectSourceTranslation', fetchProjectSourceTranslation);
  const flattenObject = (obj: any) => {
    const toReturn: any = {};

    for (const i in obj) {
      if (!obj.hasOwnProperty(i)) {
        continue;
      }

      if ((typeof obj[i]) == 'object' && obj[i] !== null) {
        const flatObject = flattenObject(obj[i]);
        for (const j in flatObject) {
          if (!flatObject.hasOwnProperty(j)) {
            continue;
          }

          toReturn[i + '.' + j] = flatObject[j];
        }
      } else {
        toReturn[i] = obj[i];
      }
    }

    return toReturn;
  };
  const flatData = flattenObject(data);


  const [uploadLoading, setUploadLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileUploadPercentage, setFileUploadPercentage] = useState(0);

  const [alert, setAlert] = useState<AlertProps>();

  const handleFileUpload = (e: any) => {
    setAlert(undefined);
    setUploadLoading(true);

    const fileReader = new FileReader();
    fileReader.onload = onFileLoad;
    fileReader.onprogress = onFileProgress;
    fileReader.readAsArrayBuffer(e.target.files[0]);
    setFileName(e.target.files[0]?.name);
  };

  const onFileProgress = (e: any) => {
    if (e.lengthComputable) {
      const percentage = Math.round((e.loaded / e.total) * 100);
      if (percentage < 100) {
        setFileUploadPercentage(percentage);
      }
    }
  };

  const onFileLoad = async (e: any) => {
    const { error } = await supabase.storage.from('translations').upload(
      'sources/1.json',
      e.target.result,
      {
        cacheControl: '1800',
        upsert: true
      }
    );

    setFileUploadPercentage(100);

    if (error) {
      setUploadLoading(false);
      setAlert({
        type: 'error',
        title: 'An error accured while uploading the file.',
        children: error.message
      });
      return;
    }
    
    setUploadLoading(false);
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
            <></>
          </Header>

          <div className='grid grid-cols-4 gap-6'>
            { loaded ?
                <>
                  <div className='col-span-2 flex flex-col gap-4'>
                    <Input name='search' placeholder='Search for translations' icon={<MagnifyingGlassIcon />} className='w-full mb-2' />
                    <Text size='base' color='dark' weight='600' className='mb-2'>Translations</Text>
                    {
                      Object.keys(flatData).map((key, i) => (
                        <div key={i} className='px-4 py-3 rounded-lg bg-white border border-gray-200 hover:border-gray-300 flex justify-between items-center cursor-pointer transition-all hover:translate-x-3'>
                          <Text size='sm' color='dark'>{flatData[key]}</Text>
                          <div className='border border-gray-200 px-1.5 bg-gray-50 rounded'>
                            <Text size='xs' color='light' weight='300'>{key}</Text>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  <div></div>
                  <div className='sticky top-0'>
                    <div className='rounded-lg bg-indigo-500 px-5 py-4 mb-12'>
                      <Text size='xs' color='white' className='opacity-70 mb-2'>Analytics</Text>
                      <Text size='base' color='white' weight='600'>The project is 80% translated.</Text>
                      <div className='flex items-center gap-x-3 mt-6'>
                        <ChartBarIcon className='w-6 h-6 text-white/40' />
                        <Progress color='white' percentage={80} showPercentage />
                      </div>
                    </div>
                    <div className='mb-12'>
                      <Text size='base' color='dark' weight='600' className='mb-4'>Languages & Translations</Text>
                      <div className='grid grid-cols-2'>
                        <div className='flex justify-start'>
                          <div className='flex flex-col items-center'>
                            <Text color='dark' size='base' weight='500'>187+</Text>
                            <Text color='light' size='xs'>translations</Text>
                          </div>
                        </div>
                        <div className='flex justify-end'>
                          <div className='flex flex-col items-center'>
                            <Text color='dark' size='base' weight='500'>23+</Text>
                            <Text color='light' size='xs'>languages</Text>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='mb-12'>
                      <Text size='base' color='dark' weight='600' className='mb-4'>Translators</Text>
                      <Avatar size='base' profiles={[
                        profile,
                        profile,
                        profile
                      ]} />
                    </div>
                  </div>
                </>
              :
                <div className='col-span-2'>
                  <div className='flex items-center mb-4'>
                    <InformationCircleIcon className='w-5 h-5 text-slate-700 mr-3' />
                    <Text color='dark' size='base' weight='600'>Import source language JSON</Text>
                  </div>
                  <Text size='sm' weight='300' className='mb-4'>You have to import the JSON file of the source language translation, so this will be the starting point for the translators of your project.</Text>
                  <div className='flex items-center gap-6'>
                    <div className='relative overflow-hidden inline-block group'>
                      <form autoComplete='off' noValidate>
                        <input type='file' className='absolute top-0 right-0 bottom-0 left-0 w-full h-full opacity-0 cursor-pointer' onChange={(e: any) => handleFileUpload(e)} />
                        <Button icon={<DocumentTextIcon />} className='group-hover:bg-indigo-600' disabled={uploadLoading} loading={uploadLoading}>Import JSON file</Button>
                      </form>
                    </div>
                    { uploadLoading &&
                      <div className=''>
                        <Text size='sm' className='mb-1'>Uploading {fileName}</Text>
                        <Progress percentage={fileUploadPercentage} />
                      </div>
                    }
                  </div>
                  { alert && !uploadLoading &&
                    <Alert type={alert.type} title={alert.title} className='mt-6'>{alert.children}</Alert>
                  }
                </div>
            }
          </div>
        </>
      }
    </>
  );
};

export default Project;