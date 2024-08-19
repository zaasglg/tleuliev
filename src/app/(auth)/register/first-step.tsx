import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { UserProps } from '@/utils/type'
import { Select, SelectGroup, SelectLabel } from '@radix-ui/react-select'

interface Props {
	formData: UserProps
	setFormData: (data: UserProps) => void
}

export default function FirstStep({ formData, setFormData }: Props) {
	return (
		<>
			<div>
				<Label htmlFor='name'>Аты жөні (Куәліктегідей)</Label>
				<div className='mt-1'>
					<Input
						id='name'
						type='text'
						name='name'
						value={formData.name}
						onChange={event => {
							setFormData({
								...formData,
								name: event.target.value,
							})
						}}
					/>
					{formData.errors.name ? (
						<p className='text-xs text-red-500 mt-1'>{formData.errors.name}</p>
					) : null}
				</div>
			</div>

			<div>
				<Label htmlFor='email'>Почта</Label>
				<div className='mt-1'>
					<Input
						id='email'
						type='email'
						name='email'
						value={formData.email}
						onChange={event => {
							setFormData({
								...formData,
								email: event.target.value,
							})
						}}
					/>

					{formData.errors.email ? (
						<p className='text-xs text-red-500 mt-1'>{formData.errors.email}</p>
					) : null}
				</div>
			</div>

			<div>
				<Label>Рөлі</Label>
				<Select
					onValueChange={value => {
						if (formData.role)
							setFormData({
								...formData,
								role: value,
							})
					}}
				>
					<SelectTrigger className=''>
						<SelectValue placeholder='-----------------' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel className='font-bold text-sm'>Маман</SelectLabel>
							<SelectItem value='user'>Тапсырушы</SelectItem>
						</SelectGroup>
						<SelectGroup>
							<SelectLabel className='font-bold text-sm'>Тексеруші</SelectLabel>
							<SelectItem value='redactor_redion'>Облыс бойынша</SelectItem>
							<SelectItem value='district_admin'>Аудан бойынша</SelectItem>
							<SelectItem value='village_admin'>Округ бойынша</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		</>
	)
}
