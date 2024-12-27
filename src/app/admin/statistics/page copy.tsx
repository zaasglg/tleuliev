'use client'

import { useEffect, useState } from 'react'

import Loading from '@/app/profile/loading'
import { BreadcrumbsCustom } from '@/components/breadcrumbs-custom'
import { User } from '@/types/user.types'
import fetchData from '@/utils/api/fetchData'
import CreateUserModal from './modal'
import { DataTable } from './(table)/data-table'
import { columns } from './(table)/columns'

export default function Page() {
	const [users, setUsers] = useState<User[]>()
	const [loading, setLoading] = useState(true)

	const [formData, setFormData] = useState({
		name: '',
		districtId: 0,
	})

	const fetchUsers = () => {
		fetchData('admin/users/district_admin').then(res => {
			console.log(res)
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
						<h2 className='text-lg lg:text-4xl font-bold'>Аудандық админдер</h2>
					</div>

					<div className='flex items-center space-x-3'>
						<CreateUserModal fetchUsers={fetchUsers} />
					</div>
				</div>

				{/*breadcrumb*/}
				<BreadcrumbsCustom items={['Админ', 'Аудандық админдер']} />
			</section>
			{loading && <Loading />}
			<section className='mt-10'>
				{!loading && <DataTable columns={columns} data={users} />}
			</section>
		</>
	)
}
