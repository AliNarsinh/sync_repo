import axios from '@app/config/request';
import { AxiosResponse } from 'axios';

export const getBinah = async (id: string): Promise<AxiosResponse> => {
  return axios.get(`/api/v1/user-session-history/${id}`);
};
