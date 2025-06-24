import axios from '@app/config/request';
import { Integrations } from '@app/constants';
import { AxiosResponse } from 'axios';

export const postBinahMeasureResults = (
  integration: Integrations,
  sessionData: Record<string, any>,
): Promise<AxiosResponse> => {
  try {
    const response = axios.post('api/v1/user-session-history', { integration, sessionData });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getHistoryCounts = async (year: string): Promise<AxiosResponse> => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const response = await axios.get(`api/v1/user-session-history/counts/${year}?currentTimezone=${timezone}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getHistories = async (sessionDate?: string): Promise<AxiosResponse> => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const response = await axios.get(
      `/api/v1/user-session-history?sessionDate=${sessionDate}&currentTimezone=${timezone}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getEligible = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(`/api/v1/config/eligible`);
    return response;
  } catch (error) {
    throw error;
  }
};
