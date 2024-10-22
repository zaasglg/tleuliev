import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UserProps } from '@/utils/type'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

interface Props {
	formData: UserProps
	setFormData: (formData: UserProps) => void
}

export default function FourthStep({ formData, setFormData }: Props) {
	const [type, setType] = useState('password')
	const [type2, setType2] = useState('password')

	const togglePasswordVisibility = () => {
		setType(prevType => (prevType === 'password' ? 'text' : 'password'))
	}

	const togglePasswordCVisibility = () => {
		setType2(prevType => (prevType === 'password' ? 'text' : 'password'))
	}

	return (
		<>
			<div className='space-y-1'>
				<Label htmlFor='password'>Құпия сөз</Label>
				<div className='mt-1 relative'>
					<Input
						id='password'
						type={type}
						name='password'
						value={formData.password}
						onChange={event => {
							setFormData({
								...formData,
								password: event.target.value,
							})
						}}
					/>

					<div className='absolute top-0 right-0'>
						<Button variant='ghost' onClick={togglePasswordVisibility}>
							{type === 'password' ? <Eye /> : <EyeOff />}
						</Button>
					</div>
				</div>
			</div>

			<div className='space-y-1'>
				<Label htmlFor='passwordC'>Құпия сөзді қайталаыңыз</Label>
				<div className='mt-1 relative'>
					<Input
						id='passwordC'
						type={type2}
						name='passwordC'
						value={formData.passwordC}
						onChange={event => {
							setFormData({
								...formData,
								passwordC: event.target.value,
							})
						}}
					/>

					<div className='absolute top-0 right-0'>
						<Button variant='ghost' onClick={togglePasswordCVisibility}>
							{type2 === 'password' ? <Eye /> : <EyeOff />}
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}
