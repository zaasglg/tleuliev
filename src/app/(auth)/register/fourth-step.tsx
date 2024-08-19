import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UserProps } from '@/utils/type'

interface Props {
	formData: UserProps
	setFormData: (formData: UserProps) => void
}

export default function FourthStep({ formData, setFormData }: Props) {
	return (
		<>
			<div className='space-y-1'>
				<Label htmlFor='password'>Құпиясөз</Label>
				<div className='mt-1'>
					<Input
						id='password'
						type='password'
						name='password'
						value={formData.password}
						onChange={event => {
							setFormData({
								...formData,
								password: event.target.value,
							})
						}}
					/>
				</div>
			</div>

			<div className='space-y-1'>
				<Label htmlFor='passwordC'>Құпия сөзді қайталаыңыз</Label>
				<div className='mt-1'>
					<Input
						id='passwordC'
						type='password'
						name='passwordC'
						value={formData.passwordC}
						onChange={event => {
							setFormData({
								...formData,
								passwordC: event.target.value,
							})
						}}
					/>
				</div>
			</div>
		</>
	)
}
