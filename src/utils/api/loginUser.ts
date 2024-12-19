'use server'

import axios from 'axios'
import { cookies } from 'next/headers'

export default async function loginUser(phone: string, password: string) {
	try {
		let new_phone = String(phone).replace(/\D/g, '')

		const response = await axios.post('http://api.agroduken.kz/api/login', {
			phone: new_phone,
			password,
		})

		const data = response.data

		cookies().set('token', data.token, { httpOnly: true })

		return { data, status: 200 }
	} catch (error) {
		// Если возникает ошибка, возвращаем сообщение об ошибке
		return { message: 'Internal server error', status: 500 }
	}
}
