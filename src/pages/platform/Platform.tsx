import { GlobeEuropeAfricaIcon, UserCircleIcon } from '@heroicons/react/24/outline';

import { useNavigate, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import supabase from '../../utils/supabase';
import { useUser } from '../../utils/useUser';

import Button from '../../components/ui/form/Button';
import Navbar from '../../components/Navbar';
import Select, { SelectPropsOption } from '../../components/ui/form/Select';
import Alert, { AlertProps } from '../../components/ui/Alert';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/form/Input';

type OnboardData = {
  fullName: string;
  country: SelectPropsOption;
};

const Platform: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertProps>();
  
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
        type: 'error',
        title: 'An error accured while onboarding.',
        children: error.message
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
        <Outlet />
      </div>

      {
        isLoggedIn && !onboarded ?
          <>
            <form onSubmit={handleSubmit(submitOnboard)} autoComplete='off' noValidate>
              <Modal
                color='primary'
                icon={<UserCircleIcon />}
                title='Get started with your account!'
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
                      placeholder='Your full name'
                      icon={<UserCircleIcon />}
                    />
                    <Select
                      control={control}
                      error={errors.country}
                      name='country'
                      label='Country'
                      icon={<GlobeEuropeAfricaIcon />}
                      placeholder='Your country'
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
                buttons={[
                  <Button type='submit' loading={loading} disabled={!isValid || loading}>
                    Get started
                  </Button>
                ]}
                toggled
              >We need some more info about youself to configure the platform for you.</Modal>
            </form>
          </>
        :
          null
      }
    </>
  );
};

export default Platform;
