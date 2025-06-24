import axios from '@app/config/request';
import { AxiosResponse } from 'axios';
import { ILoginData, ISignUp } from '../types/AuthTypes';

export const requestMe = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.get('api/v1/users/me');
    return response;
  } catch (error) {
    throw error;
  }
};

export const requestLogin = async (requestData: ILoginData): Promise<AxiosResponse> => {
  try {
    const response = await axios.post('api/v1/auth/login', requestData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const requestSignUp = async (requestPayload: ISignUp): Promise<AxiosResponse> => {
  try {
    const response = await axios.post('/api/v1/auth/register', requestPayload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const forgetPassword = (email: string): Promise<AxiosResponse> => {
  try {
    const response = axios.post('api/v1/auth/forgot-password', { email });
    return response;
  } catch (error) {
    throw error;
  }
};

export const refreshAccessToken = (refreshToken: string): Promise<AxiosResponse> => {
  try {
    const response = axios.post('api/v1/auth/refresh-tokens', { refreshToken });
    return response;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = (password: string, token: string): Promise<AxiosResponse> => {
  try {
    const response = axios.post('api/v1/auth/reset-password', { password, token });
    return response;
  } catch (error) {
    throw error;
  }
};
