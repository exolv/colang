import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import supabase from '../../utils/supabase';
import { useUser } from '../../utils/useUser';

import login from '../../assets/img/login.jpg';

import {
  EnvelopeIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
import { QuestionMarkCircleIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

import Title from '../../components/ui/typography/Title';
import Text from '../../components/ui/typography/Text';
import Input from '../../components/ui/form/Input';
import Button from '../../components/ui/form/Button';
import Alert, { AlertData } from '../../components/ui/Alert';

type RegisterData = {
  email: string;
  password: string;
};

const Register: React.FC = () => {
  const { isLoggedIn } = useUser({ redirect: '/platform', foundRedirect: true });
  
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertData>();

  const { register, control, handleSubmit, formState: { errors, isValid } } = useForm<RegisterData>({ mode: 'onTouched' });
  
  const submitRegister = async (registerData: RegisterData, e: any) => {
    e.preventDefault();

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: registerData.email,
      password: registerData.password,
      options: {
        data: {
          fullName: null,
          country: null,
          onboarded: false
        }
      }
    });
    
    if (error) {
      setLoading(false);
      setAlert({
        status: 'ERROR',
        title: 'An error accured while registering.',
        message: error.message
      });
      return;
    }

    setLoading(false);
    setAlert({
      status: 'SUCCESS',
      title: 'Your account has been successfully created!',
      message: 'We have sent a confirmation email to your email address.'
    });
  };

  return (
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
          <Link to='/login'>
            <Text size='text-md' color='text-indigo-500'>Log in</Text>
          </Link>
        </div>
        <div>
          <Title color='text-slate-900' className='mb-1'>Register for an account</Title>
          <Text>Sign up to start translating your content.</Text>
        </div>
        <div>
          <form onSubmit={handleSubmit(submitRegister)} autoComplete='off' noValidate>
            <Input 
              register={register('email', {
                required: 'This field is required.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Enter a valid email address.'
                }
              })}
              control={control}
              error={errors.email}
              type='email'
              name='email'
              label='Email'
              icon={<EnvelopeIcon className={`w-5 h-5 ${errors.email ? 'text-red-400 group-hover:text-red-500 group-focus:text-red-500' : 'text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500'} transition-colors ease-linear`} />}
              placeholder='Your email address'
              className='mb-6'
            />
            <Input
              register={register('password', {
                required: 'This field is required.',
                pattern: /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_]).{8,}$/
              })}
              control={control}
              error={errors.password}
              type='password'
              name='password'
              label='Password'
              icon={<LockClosedIcon className={`w-5 h-5 ${errors.password ? 'text-red-400 group-hover:text-red-500 group-focus:text-red-500' : 'text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500'} transition-colors ease-linear`} />}
              placeholder='Your password'
              className='mb-6'
            />
            <div className='flex items-center'>
              <Button bg='bg-indigo-500 hover:bg-indigo-600' color='text-white' fontSize='text-sm' padding='px-10 py-3' spinner={loading} disabled={!isValid || loading} className='shadow-md shadow-indigo-500/50'>
                Create your account
              </Button>
            </div>
          </form>
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
        </div>
        <div className='bg-gray-200 w-full h-px'></div>
        <div>
          <div className='flex items-center mb-4'>
            <QuestionMarkCircleIcon className='w-5 h-5 text-slate-700 mr-3' />
            <Text color='text-slate-700' size='text-base' weight='font-semibold'>Need help creating your account?</Text>
          </div>
          <Text size='text-sm' className='mb-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, maiores neque enim sapiente consectetur ipsum incidunt nostrum delectus.</Text>
          <Link to='/support'>
            <Text size='text-sm' color='text-indigo-500'>Contact the Support</Text>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;