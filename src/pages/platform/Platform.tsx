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
  
  const { isLoggedIn, fullName } = useUser({ redirect: '/login' });

  return (
    <>
      <Navbar />

      <div className='px-72 pb-8 pt-32'>
        <Outlet />
      </div>
    </>
  );
};

export default Platform;
