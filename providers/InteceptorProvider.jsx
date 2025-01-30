import React, { useLayoutEffect } from 'react'
import { axiosInstance, refreshToken } from '../src/utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../src/store/slices/authSlice';

const InteceptorProvider = ({children}) => {
    const {user, accessToken} = useSelector((state) => state?.auth);
    // console.log(user, accessToken)

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const requestInterceptor = axiosInstance.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${accessToken}`;
            return config;
        });

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
        } 
        

    }, [user, accessToken])

    useLayoutEffect(() => {
        const responseInterceptor = axiosInstance.interceptors.response.use((response) => response, async (error) => {
            const originalRequest = error.config;

            if (error.response.status == 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const response = await refreshToken();
                    const {user, accessToken} = response.data;
                    dispatch(login({user, accessToken}));
                    // console.log('user, accesstToken',user, accessToken)
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    console.error('Error refreshing access token:', refreshError);
                    
                }

            }

            return Promise.reject(error);
        });

        return () => {
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, []);
  
    return children;
}

export default InteceptorProvider