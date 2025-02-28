'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

// Steps
// import FirstStep from '@/app/(auth)/register/first-step'
// import FourthStep from '@/app/(auth)/register/fourth-step'
// import SecondStep from '@/app/(auth)/register/second-step'
// import ThirdStep from '@/app/(auth)/register/third-step'

import registerUser from '@/utils/api/registerUser'
import { UserProps } from '@/utils/type'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import FirstStep from './first-step'
import FourthStep from './fourth-step'
import SecondStep from './second-step'
import ThirdStep from './third-step'

export default function Login() {
	const router = useRouter()
	const [step, setStep] = useState(1)
	const [formData, setFormData] = useState<UserProps>({
		role: 'user',
		name: '',
		email: '',
		phone: '',
		profession: '',
		birthday: '',
		region: 0,
		district: 0,
		village: 0,
		password: '',
		passwordC: '',
		errors: {},
	})

	const [isLogining, setIsLogining] = useState<boolean>(false)
	const [error, setError] = useState('')

	const handleSuccess = (data: { message: string }) => {
		console.log(data)
	}

	const handleError = (error: Error) => {
		console.log(error.message)
		// setModal(false)
	}

	// validation
	const validateStep = () => {
		const errors = {} as Record<string, string>

		if (step === 1) {
			if (!formData.name)
				errors.name = 'Аты жөні міндетті түрде толтырылу керек'
			if (!formData.email) errors.email = 'Email міндетті түрде толтырылу керек'
		} else if (step === 2) {
			if (!formData.phone)
				errors.phone = 'Телефон номер міндетті түрде толтырылу керек'
			if (!formData.profession)
				errors.profession = 'Мамандық міндетті түрде толтырылу керек'
			if (!formData.birthday)
				errors.birthday = 'Туылған күн міндетті түрде толтырылу керек'
		} else if (step === 3) {
			if (formData.region === 0)
				errors.region = 'Аймақ міндетті түрде таңдалуы керек'
			if (formData.district === 0)
				errors.district = 'Аудан міндетті түрде таңдалуы керек'
			if (formData.village === 0)
				errors.village = 'Ауыл міндетті түрде таңдалуы керек'
		} else if (step === 4) {
			if (!formData.password)
				errors.password = 'Құпиясөз міндетті түрде толтырылу керек'
			// if (formData.password !== formData.passwordC) errors.passwordC = "Құпиясөздер сәйкес емес";
		}

		setFormData({ ...formData, errors })

		return Object.keys(errors).length === 0
	}

	// handle submit
	const handleSubmit = () => {
		if (!validateStep()) return

		switch (step) {
			case 1:
				setStep(2)
				console.log('ewf')
				break
			case 2:
				setStep(3)
				break
			case 3:
				setStep(4)
				break
			case 4:
				registerUser({
					profession: formData.profession,
					name: formData.name,
					email: formData.email,
					password: formData.password,
					phone: formData.phone,
					birthday: formData.birthday,
					region_id: formData.region,
					district_id: formData.district,
					village_id: formData.village,
					role: formData.role,
				})
					.then(result => {
						if (result.status === 200) {
							setIsLogining(false)
							router.push('/')
						} else {
							setIsLogining(false)

							// @ts-ignore
							setError(result.message)
						}
					})
					.finally(() => {
						setIsLogining(false)
					})
				break
			default:
				break
		}
	}

	return (
		<>
			<div className='w-full lg:grid lg:min-h-screen  lg:grid-cols-2'>
				<div className='flex items-center justify-center py-12 px-10 lg:px-0'>
					<div className='mx-auto grid w-[350px] gap-6'>
						<div className='flex justify-center items-center'>
							<div className='mx-auto w-full max-w-sm lg:w-96'>
								<div className='grid gap-2 text-left'>
									<h1 className='text-3xl font-bold'>Тіркелу</h1>
								</div>

								<div className='mt-8'>
									<div className='mt-6'>
										<form className='space-y-3'>
											{step === 1 ? (
												<FirstStep
													formData={formData}
													setFormData={setFormData}
												/>
											) : null}
											{step === 2 ? (
												<SecondStep
													formData={formData}
													setFormData={setFormData}
												/>
											) : null}
											{step === 3 ? (
												<ThirdStep
													formData={formData}
													setFormData={setFormData}
												/>
											) : null}
											{step === 4 ? (
												<FourthStep
													formData={formData}
													setFormData={setFormData}
												/>
											) : null}

											<div className='flex space-x-3'>
												{step > 1 && (
													<Button
														onClick={() => {
															setStep(prev => prev - 1)
														}}
														type='button'
														variant='outline'
														className='w-full space-x-2'
													>
														<ArrowLeft size={15} />
														<span>Артқа</span>
													</Button>
												)}

												<Button
													onClick={handleSubmit}
													type='button'
													className='w-full space-x-2'
												>
													<span>{step < 4 ? 'Келесі' : 'Тіркелу'}</span>
													<ArrowRight size={15} />
												</Button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
