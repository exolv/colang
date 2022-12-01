import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { UserRole } from '../pages/register/Register';
import { useUser } from './useUser';

export interface RoleData {
  validRole: boolean;
};

export const useRole = ({
  checkRole,
  redirect = ''
}: { checkRole: UserRole; redirect: string; }): RoleData => {
  const navigate = useNavigate();

  const { role } = useUser();
  useEffect(() => {
    if (!redirect || !checkRole) {
      return;
    }

    if (role !== checkRole) {
      navigate(redirect);
    }
  }, [role, redirect]);

  if (role === checkRole) {
    return {
      validRole: true
    };
  }

  return {
    validRole: false
  };
};