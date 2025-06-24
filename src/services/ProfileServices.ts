import axios from '@app/config/request';
import { AxiosResponse } from 'axios';
import { IProfile } from '@app/types/ProfileTypes';

export const GetUser = async (): Promise<AxiosResponse<IProfile>> => {
  try {
    const response = await axios.get('api/v1/users/me');
    return response;
  } catch (error) {
    throw error;
  }
};

export const UpdateUser = async (requestData: Partial<IProfile>): Promise<AxiosResponse<IProfile>> => {
  try {
    const response = await axios.put('api/v1/users/', requestData);
    return response;
  } catch (error) {
    throw error;
  }
};
