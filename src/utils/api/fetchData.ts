'use server'

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { cookies } from 'next/headers'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export default async function fetchData(
	url: string,
	method: Method = 'GET',
	data?: Record<string, any>
): Promise<{ data?: any; message?: string; status: number }> {
	try {
		const token = cookies().get('token')

		const options: AxiosRequestConfig = {
			method: method,
			url: `https://api.agroduken.kz/api/${url}`,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token?.value}`,
			},
		}

		if (data && (method === 'POST' || method === 'PUT')) {
			options.data = data
		}

		const response: AxiosResponse = await axios(options)

		return { data: response.data, status: response.status }
	} catch (error: unknown) {
		console.error('Error fetching data:', error)

		if (axios.isAxiosError(error) && error.response) {
			return {
				message: error.response.data.message || 'Request failed',
				status: error.response.status,
			}
		}

		return { message: 'Internal server error', status: 500 }
	}
}
