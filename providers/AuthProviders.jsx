import React, { useEffect, useState } from 'react';
import { refreshToken } from '../src/utils/api';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from '../src/store/slices/authSlice';

const AuthProviders = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await refreshToken();
        const { accessToken, user } = response.data;
        dispatch(login({ accessToken, user }));
      } catch (error) {
        toast.error(error?.message || 'Failed to refresh session.');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>; // Replace with a loading spinner
  }

  return children;
};

export default AuthProviders;