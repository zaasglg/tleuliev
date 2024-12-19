'use server'

import axios from 'axios'
import { cookies } from 'next/headers'

export default async function registerUser({
	role,
	name,
	email,
	phone,
	profession,
	birthday,
	region_id,
	district_id,
	village_id,
	password,
}: {
	role: string
	name: string
	email: string
	phone: string
	profession: string
	birthday: string
	region_id: number
	district_id: number
	village_id: number
	password: string
}) {
	try {
		let new_phone = String(phone).replace(/\D/g, '')

		const response = await axios.post('http://api.agroduken.kz/api/register', {
			role,
			name,
			email,
			phone: new_phone,
			profession,
			birthday,
			region_id,
			district_id,
			village_id,
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
