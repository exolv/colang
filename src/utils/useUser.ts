import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useSWR from 'swr';
import supabase from './supabase';

export interface UserData {
  email: string | undefined;
  fullName: string | undefined;
  country: string | undefined;
  signUpDate: string | undefined;
  isLoggedIn: boolean;
  onboarded: boolean;
};

export const useUser = ({
  redirect = '',
  foundRedirect = false
} = {}): UserData => {
  const navigate = useNavigate();

  const fetchUser = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      return {
        email: data.session.user.email,
        fullName: data.session.user.user_metadata.fullName,
        country: data.session.user.user_metadata.country,
        signUpDate: data.session.user.created_at,
        isLoggedIn: true,
        onboarded: data.session.user.user_metadata.onboarded
      };
    }

    return {
      email: undefined,
      fullName: undefined,
      country: undefined,
      signUpDate: undefined,
      isLoggedIn: false,
      onboarded: false
    };
  };

  const { data: user } = useSWR<UserData>('/getSession', fetchUser);
  useEffect(() => {
    if (!redirect || !user) {
      return;
    }

    if ((redirect && !foundRedirect && !user.isLoggedIn) || (foundRedirect && user.isLoggedIn)) {
      navigate(redirect);
    }
  }, [user, foundRedirect, redirect]);

  if (user) {
    return user;
  }

  return {
    email: undefined,
    fullName: undefined,
    country: undefined,
    signUpDate: undefined,
    isLoggedIn: false,
    onboarded: false
  };
};