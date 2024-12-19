'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

import Footer from '@/components/app/footer'
import Header from '@/components/app/header'
import loginUser from '@/utils/api/loginUser'
import { useRouter } from 'next/navigation'
import { MaskedInput } from 'react-text-input-mask'
import fetchData from '@/utils/api/fetchData'
import { API_ENDPOINTS } from '@/utils/endpoint'

export default function Login() {
	const router = useRouter()

	const [isLogining, setIsLogining] = useState<boolean>(false)
	const [error, setError] = useState('')
	const [formData, setFormData] = useState({
		phone: '',
		password: '',
	})

	const handleSubmit = async () => {
		setIsLogining(true)

		try {
			loginUser(formData.phone, formData.password).then(result => {
				console.log(result);
				if (result.status === 200) {
					setIsLogining(false)

							fetchData(API_ENDPOINTS.user)
								.then(res => {
									// console.log();
									if (res.data['role'][0] == 'user') {
										router.push('/test')
									} else if (res.data['role'][0] == 'region_admin' || res.data['role'][0] == 'district_admin' || res.data['role'][0] == 'village_admin	') {
										if (res.data['permissions'][0] == 'region') {
											router.push('/redactor/statistics/region')
										} else if (res.data['permissions'][0] == 'district') {
											router.push('/redactor/statistics/district')
										} else if (res.data['permissions'][0] == 'village') {
											router.push('/redactor/statistics/village')
										} else {
											router.push('/redactor/reports')
										}
										
									} else if (res.data['role'][0] == 'admin') {
										router.push('/admin/users')
									}
								})
								.catch(error => {
									console.error('Failed to fetch user data:', error)
								})


				} else {
					setIsLogining(false)

					// @ts-ignore
					setError(result.message)
				}
			})
		} catch (error) {
			setError((error as Error).message)
		}
	}

	return (
		<>
			<Header />
			<div className='flex items-center justify-center py-36 px-10 lg:px-0'>
				<div className='mx-auto grid w-[350px] gap-6'>
					<div className='grid gap-2 text-left'>
						<h1 className='text-3xl font-bold'>Кіру</h1>
					</div>

					<div className='grid gap-4'>
						<div className='grid gap-2'>
							<Label htmlFor='email'>Телефон номер</Label>
							<MaskedInput
								mask='+9 (999) 999 9999'
								value={formData.phone}
								onChange={val => {
									setFormData({
										...formData,
										phone: val.target.value,
									})
								}}
							>
								<Input id='phone' type='text' />
							</MaskedInput>
						</div>
						<div className='grid gap-2'>
							<div className='flex items-center'>
								<Label htmlFor='password'>Құпия сөз</Label>
								{/* <Dialog>
										<DialogTrigger className='ml-auto inline-block text-sm underline'>
											Құпия сөзді ұмыттым
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>Құпиясөзді қалпына келтіру</DialogTitle>
												<DialogDescription>
													Біз сіздің почтаңызға sms түріңде жаңа құпия сөзіңізді
													жібереміз
												</DialogDescription>
											</DialogHeader>
											<div className='flex w-full max-w-sm items-center space-x-2'>
												<Input type='email' placeholder='Email' />
												<Button type='submit'>Жіберу</Button>
											</div>
										</DialogContent>
									</Dialog> */}
							</div>
							<Input
								id='password'
								type='password'
								placeholder='*********'
								value={formData.password}
								onChange={event => {
									setFormData({
										...formData,
										password: event.target.value,
									})
								}}
							/>
						</div>

						{error ? (
							<p className='text-sm text-red-500 '>
								Номер немесе құпия сөз қате
							</p>
						) : null}

						<Button type='submit' className='w-full' onClick={handleSubmit}>
							{isLogining ? 'жүктелуде...' : 'Кіру'}
						</Button>
					</div>
				</div>
			</div>

			<Footer />
		</>
	)
}
