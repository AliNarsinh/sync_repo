import axios from '@app/config/request';
import { AxiosResponse } from 'axios';

export const getDashboardApi = async (integrationId: number): Promise<AxiosResponse> => {
  return axios.get(`/api/v1/user-session-history?integration=${integrationId}&page=1&limit=5`);
};
