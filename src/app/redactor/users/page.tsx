'use client'

import { useEffect, useState } from 'react'

import Loading from '@/app/profile/loading'
import { BreadcrumbsCustom } from '@/components/breadcrumbs-custom'
import { User } from '@/types/user.types'
import fetchData from '@/utils/api/fetchData'
import CreateUserModal from './modal'
import UsersTable from './table'

export default function Page() {
	const [users, setUsers] = useState<User[]>()
	const [loading, setLoading] = useState(true)

	const [formData, setFormData] = useState({
		name: '',
		districtId: 0,
	})

	const fetchUsers = () => {
		fetchData('redactor/users/user').then(res => {
			setUsers(res.data)
			setLoading(false)
		})
	}

	useEffect(() => {
		fetchUsers()
	}, [])

	return (
		<>
			<section>
				<div className='flex justify-between items-center gap-10'>
					<div>
						<h2 className='text-xl lg:text-4xl font-bold'>Мамандар</h2>
					</div>

					<div className='flex items-center space-x-3'>
						<CreateUserModal fetchUsers={fetchUsers} />
					</div>
				</div>

				{/*breadcrumb*/}
				<BreadcrumbsCustom items={['Админ', 'Округтар']} />
			</section>
			{loading && <Loading />}
			<section className='mt-10'>
				{!loading && <UsersTable users={users} fetchUsers={fetchUsers} />}
			</section>
		</>
	)
}
