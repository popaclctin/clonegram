import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/authSlice';

export default function useAuth() {
  const user = useSelector(selectCurrentUser);

  return useMemo(() => ({ user }), [user]);
}
