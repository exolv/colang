import { GlobeEuropeAfricaIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';

import login from '../../assets/img/login.jpg';

import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import supabase from '../../utils/supabase';
import { useUser } from '../../utils/useUser';

import Button from '../../components/ui/form/Button';
import Select, { SelectPropsOption } from '../../components/ui/form/Select';
import Alert, { AlertProps } from '../../components/ui/Alert';
import Input from '../../components/ui/form/Input';
import Title from '../../components/ui/typography/Title';
import Text from '../../components/ui/typography/Text';

type OnboardData = {
  fullName: string;
  country: SelectPropsOption;
};

const Onboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertProps>();
  
  const { isLoggedIn, fullName } = useUser({ redirect: '/login' });

  if (fullName !== null) {
    navigate('/projects');
  }

  const { register, control, handleSubmit, formState: { errors, isValid } } = useForm<OnboardData>({ mode: 'onTouched' });

  const submitOnboard = async (onboardData: OnboardData, e: any) => {
    e.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      data: {
        fullName: onboardData.fullName,
        country: onboardData.country.value
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
    navigate('/projects');
  };

  return (
    <>
      { isLoggedIn && 
        <div className='flex h-screen'>
          <div className='w-3/5 relative overflow-hidden'>
            <img src={login} alt='colang' className='object-cover absolute' />
            <div className='absolute w-full h-full bg-gradient-to-b from-transparent to-black flex items-end'>
              <div className='w-full p-20'>
                <h1 className='font-prompt text-3xl text-white leading-normal'>Helping businesses to get global.<br />Scale up. Anywhere.</h1>
                <div className='bg-white w-24 h-px mt-6'></div>
              </div>
            </div>
          </div>
          <div className='w-2/5 p-20 flex flex-col justify-between'>
            <div className='flex justify-between items-center mb-6'>
              <Link to='/'>
                <img src='/colang-logo.svg' alt='colang' width={150} />
              </Link>
            </div>
            <div>
              <Title className='mb-1'>Let's complete your account!</Title>
              <Text size='base'>We need more info about you to setup the platform.</Text>
            </div>
            <div>
              <form onSubmit={handleSubmit(submitOnboard)} autoComplete='off' noValidate>
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
                  className='mb-6'
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
                <div className='flex items-center gap-x-6'>
                  <Button type='submit' loading={loading} disabled={!isValid || loading}>
                    Enter the platform
                  </Button>
                </div>
              </form>
              { alert && !loading &&
                <Alert type={alert.type} title={alert.title} className='mt-6'>{alert.children}</Alert>
              }
            </div>
            <div className='bg-gray-200 w-full h-px'></div>
            <div>
              <div className='flex items-center mb-4'>
                <QuestionMarkCircleIcon className='w-5 h-5 text-slate-700 mr-3' />
                <Text color='dark' size='base' weight='600'>Need with your account?</Text>
              </div>
              <Text size='sm' weight='300' className='mb-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, maiores neque enim sapiente consectetur.</Text>
              <Link to='/support'>
                <Text size='sm' color='primary'>Contact the Support</Text>
              </Link>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Onboard;