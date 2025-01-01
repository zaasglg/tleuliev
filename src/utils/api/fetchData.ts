'use server';

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { cookies } from 'next/headers';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export default async function fetchData(
  url: string,
  method: Method = 'GET',
  data?: Record<string, any>
): Promise<{ data?: any; message?: string; status: number }> {
  const token = cookies().get('token')?.value;

  const options: AxiosRequestConfig = {
    method,
    url: `http://api.agroduken.kz/api/${url}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }), // Add Authorization header only if token exists
    },
    ...(data && ['POST', 'PUT'].includes(method) && { data }), // Add data only for POST or PUT methods
  };

  try {
    const response: AxiosResponse = await axios(options);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error('Error fetching data:', error);

    if (axios.isAxiosError(error) && error.response) {
      return {
        message: error.response.data?.message || 'Request failed',
        status: error.response.status,
      };
    }

    return { message: 'Internal server error', status: 500 };
  }
}
