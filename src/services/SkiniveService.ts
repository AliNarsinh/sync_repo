import axios from '@app/config/request';
import { AxiosResponse } from 'axios';

const headers = {
  'Content-Type': 'multipart/form-data',
};
export const skinivevalidate = async (requestData: FormData): Promise<AxiosResponse> => {
  try {
    const response = await axios.post('api/v1/integration/skinive/validate', requestData, { headers });
    return response;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

export const skinivePredict = async (requestData: FormData, languageKey: string): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`api/v1/integration/skinive/predict?languageKey=${languageKey}`, requestData, {
      headers,
    });
    return response;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

export const getSkinive = async (id: string): Promise<AxiosResponse> => {
  return axios.get(`/api/v1/user-session-history/${id}`);
};
