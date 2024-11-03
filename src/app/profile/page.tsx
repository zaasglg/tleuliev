'use client'

import Loading from '@/app/profile/loading'
import { BreadcrumbsCustom } from '@/components/breadcrumbs-custom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User } from '@/types/user.types'
import fetchData from '@/utils/api/fetchData'
import { API_ENDPOINTS } from '@/utils/endpoint'
import { useEffect, useState } from 'react'

export default function Profile() {
	const [userData, setUserData] = useState<User | null>()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchData(API_ENDPOINTS.user)
			.then(res => {
				console.log(res)
				if (res.status === 200) {
					setUserData(res.data)
				}
			})
			.catch(error => {
				console.error('Failed to fetch user data:', error)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [])

	return (
		<>
			<section>
				<div>
					<h2 className='text-lg lg:text-4xl font-bold'>Жеке кабинет</h2>
				</div>

				{/*breadcrumb*/}
				<BreadcrumbsCustom items={['Жеке кабинет']} />
			</section>

			{loading && <Loading />}

			{!loading && (
				<section className='mt-5 space-y-3'>
					<Card>
						<CardHeader>
							<CardTitle>Жеке деректер</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
								<div>
									<Label>Аты жөні</Label>
									<Input value={userData ? userData.name : ''} readOnly />
								</div>
								<div>
									<Label>Email</Label>
									<Input value={userData ? userData.email : ''} readOnly />
								</div>
								<div>
									<Label>Телефон номер</Label>
									<Input
										value={
											userData?.phone
												? `+${String(userData.phone).slice(0, 1)} (${String(
														userData.phone
												  ).slice(1, 4)}) ${String(userData.phone).slice(
														4,
														7
												  )} ${String(userData.phone).slice(7)}`
												: ''
										}
										readOnly
									/>
								</div>
								<div>
									<Label>Туылған күні</Label>
									<Input value={userData ? userData.birthday : ''} readOnly />
								</div>
								<div>
									<Label>Рөлі</Label>
									<Input value={userData ? userData.role[0] : ''} readOnly />
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className='text-xl font-normal'>Қала</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
								<div>
									<Label>Облыс</Label>
									<Input
										value={userData ? userData.region_name : ''}
										readOnly
									/>
								</div>
								<div>
									<Label>Аудан қала</Label>
									<Input
										value={userData ? userData.district_name : ''}
										readOnly
									/>
								</div>
								<div>
									<Label>Округ</Label>
									<Input
										value={userData ? userData.village_name : ''}
										readOnly
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				</section>
			)}
		</>
	)
}
