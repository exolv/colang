import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { GlobeEuropeAfricaIcon, UserCircleIcon, UserIcon } from '@heroicons/react/24/outline';

import { useNavigate, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import supabase from '../../utils/supabase';
import { useUser } from '../../utils/useUser';

import Icon from '../../components/ui/Icon';
import Button from '../../components/ui/form/Button';
import Navbar from '../../components/Navbar';
import Select, { SelectPropsOption } from '../../components/ui/form/Select';
import Alert, { AlertData } from '../../components/ui/Alert';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/form/Input';
import Title from '../../components/ui/typography/Title';
import Text from '../../components/ui/typography/Text';

type OnboardData = {
  fullName: string;
  country: SelectPropsOption;
};

const Platform: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertData>();
  
  const { isLoggedIn, onboarded, fullName } = useUser({ redirect: '/login' });

  const { register, control, handleSubmit, formState: { errors, isValid } } = useForm<OnboardData>({ mode: 'onTouched' });

  const submitOnboard = async (onboardData: OnboardData, e: any) => {
    e.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      data: {
        fullName: onboardData.fullName,
        country: onboardData.country.value,
        onboarded: true
      }
    });
    
    if (error) {
      setLoading(false);
      setAlert({
        status: 'ERROR',
        title: 'An error accured while onboarding.',
        message: error.message
      });
      return;
    }

    setLoading(false);
    navigate('/platform');
  };

  return (
    <>
      <Navbar />

      <div className='px-72 pb-8 pt-32'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <Title size='text-3xl'>Projects</Title>
            <Text size='text-base'>Explore your available projects or create a new one.</Text>
          </div>
          <Button bg='bg-indigo-500 hover:bg-indigo-600' color='text-white' fontSize='text-sm' padding='px-6 py-0' className='shadow-md shadow-indigo-500/50'>New project</Button>
        </div>

        <Outlet />
      </div>

      {
        isLoggedIn && !onboarded ?
          <>
            <form onSubmit={handleSubmit(submitOnboard)} autoComplete='off' noValidate>
              <Modal
                header={<Icon bg='bg-indigo-50'><UserCircleIcon className={`w-10 h-10 text-indigo-500`} /></Icon>}
                title={`Let's get your started!`}
                text='We need some more info about youself to configure the platform for you.'
                content={
                  <>
                    <Input 
                      register={register('fullName', {
                        required: 'This field is required.'
                      })}
                      control={control}
                      error={errors.fullName}
                      type='text'
                      name='fullName'
                      label='Full name'
                      icon={<UserIcon className={`w-5 h-5 ${errors.fullName ? 'text-red-400 group-hover:text-red-500 group-focus:text-red-500' : 'text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500'} transition-colors ease-linear`} />}
                      placeholder='Your full name'
                      className='mb-6'
                    />
                    <Select
                      control={control}
                      error={errors.country as FieldError}
                      name='country'
                      label='Country'
                      icon={<GlobeEuropeAfricaIcon className={`w-5 h-5 ${errors.country ? 'text-red-400 group-hover:text-red-500 group-focus:text-red-500' : 'text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500'} transition-colors ease-linear`} />}
                      placeholder='Your country'
                      options={[
                        { value: 'RO', label: 'Romania' },
                        { value: 'DE', label: 'Germany' },
                        { value: 'ES', label: 'Spain' }
                      ]}
                      rules={{ required: 'This field is required.' }}
                    />
                  </>
                }
              >
                <>
                  <Button bg='bg-indigo-500 hover:bg-indigo-600' color='text-white' fontSize='text-sm' padding='px-10 py-3' spinner={loading} disabled={!isValid || loading} className='shadow-md shadow-indigo-500/50'>
                    Get started
                  </Button>
                  {
                    alert && !loading &&
                      <Alert
                        bg={`${alert.status === 'SUCCESS' ? 'bg-green-50' : 'bg-red-50'}`}
                        border={`${alert.status === 'SUCCESS' ? 'border-green-500' : 'border-red-500'}`}
                        color={`${alert.status === 'SUCCESS' ? 'text-green-500' : 'text-red-500'}`}
                        icon={
                          alert.status === 'SUCCESS' ?
                            <CheckCircleIcon className={`w-5 h-5 text-green-500`} />
                          :
                            <XCircleIcon className={`w-5 h-5 text-red-500`} />
                        }
                        title={alert.title}
                        className='mt-6'
                      >
                        {alert.message}
                      </Alert>
                  }
                </>
              </Modal>
            </form>
          </>
        :
          null
      }
    </>
  );
};

export default Platform;
