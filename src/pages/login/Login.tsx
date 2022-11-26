import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Session } from '@supabase/supabase-js';
import supabase from '../../utils/supabase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useUser } from '../../utils/useUser';

import login from '../../assets/img/login.jpg';

import {
  EnvelopeIcon,
LockClosedIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon, XCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/solid';

import Title from '../../components/ui/typography/Title';
import Text from '../../components/ui/typography/Text';
import Input from '../../components/ui/form/Input';
import Button from '../../components/ui/form/Button';
import Alert, { AlertData } from '../../components/ui/Alert';

type LoginData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUser({ redirect: '/platform', foundRedirect: true });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertData>();

  const { register, control, handleSubmit, formState: { errors, isValid } } = useForm<LoginData>({ mode: 'onTouched' });
  
  const submitLogin = async (loginData: LoginData, e: any) => {
    e.preventDefault();

    setLoading(true);
    const { data: { session }, error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password
    });
    
    if (error) {
      setLoading(false);
      setAlert({
        status: 'ERROR',
        title: 'An error accured while logging in.',
        message: error.message
      });
      return;
    }

    setLoading(false);
    const response = await supabase.auth.setSession(session as Session);
    if (response.error === null) {
      navigate('/platform');
    }
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
            <img src='colang-logo.svg' alt='colang' width={150} />
          </Link>
          <Link to='/register'>
            <Text size='text-md' color='text-indigo-500'>Register</Text>
          </Link>
        </div>
        <div>
          <Title color='text-slate-900' className='mb-1'>Log into your account</Title>
          <Text>Enter the platform to access your translations.</Text>
        </div>
        <div>
          <form onSubmit={handleSubmit(submitLogin)} autoComplete='off' noValidate>
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
                Enter your account
              </Button>
              <Link to='/forgot' className='ml-6'>
                <Text size='text-sm' color='text-indigo-500'>Forgot your password?</Text>
              </Link>
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
            <Text color='text-slate-700' size='text-base' weight='font-semibold'>Need help logging into your account?</Text>
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

export default Login;