import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Districts, Regions, Villages } from '@/types/region.types'
import fetchData from '@/utils/api/fetchData'
import { ListPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { MaskedInput } from 'react-text-input-mask'

export default function CreateUserModal({
	fetchUsers,
}: {
	fetchUsers: () => void
}) {
	const [modal, setModal] = useState(false)

	const [regions, setRegions] = useState<Regions[] | null>()
	const [districts, setDistricts] = useState<Districts[] | null>()
	const [villages, setVillages] = useState<Villages[] | null>()

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		birthday: '',
		phone: '',
		region_id: 0,
		district_id: 0,
		village_id: 0,
		role: '',
		permission: '',
	})

	useEffect(() => {
		fetchData('regions').then(res => {
			setRegions(res.data)
		})
	}, [])

	return (
		<>
			<Dialog open={modal} onOpenChange={setModal}>
				<DialogTrigger asChild>
					<Button variant='outline'>
						<span className='hidden lg:block'>Маман қосу</span>
						<ListPlus className='block lg:hidden' />
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[50%]'>
					<DialogHeader>
						<DialogTitle>Маман қосу</DialogTitle>
					</DialogHeader>
					<div className='grid grid-cols-2 gap-3'>
						{/* name */}
						<div>
							<Label htmlFor='name'>Аты</Label>
							<Input
								id='name'
								value={formData.name}
								onChange={event =>
									setFormData({
										...formData,
										name: event.target.value,
									})
								}
							/>
						</div>

						{/* email */}
						<div>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								value={formData.email}
								onChange={event =>
									setFormData({
										...formData,
										email: event.target.value,
									})
								}
							/>
						</div>

						{/* phone number */}
						<div>
							<Label htmlFor='phone'>Телефон номер</Label>
							<MaskedInput
								mask='+9 (999) 999 9999'
								value={formData.phone}
								onChange={val => {
									setFormData({
										...formData,
										phone: String(val.target.value).replace(/\D/g, ''),
									})
								}}
							>
								<Input id='phone' type='text' />
							</MaskedInput>
						</div>

						{/* birthday */}
						<div>
							<Label htmlFor='date'>Туылған күні</Label>
							<Input
								id='date'
								type='date'
								value={formData.birthday}
								onChange={event =>
									setFormData({
										...formData,
										birthday: event.target.value,
									})
								}
							/>
						</div>

						{/* password */}
						<div>
							<Label htmlFor='password'>Құпиясөз</Label>
							<Input
								id='password'
								type='password'
								value={formData.password}
								onChange={event =>
									setFormData({
										...formData,
										password: event.target.value,
									})
								}
							/>
						</div>

						{/* role */}
						<div>
							<Label>Рөлі</Label>
							<Select
								value={formData.role}
								onValueChange={value => {
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
										<SelectLabel className='font-bold text-sm'>
											Тексеруші
										</SelectLabel>
										<SelectItem value='region_admin'>Облыс бойынша</SelectItem>
										<SelectItem value='district_admin'>
											Аудан бойынша
										</SelectItem>
										<SelectItem value='village_admin'>Округ бойынша</SelectItem>
										<SelectItem value='observer'>Бақылаушы</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>

						{/* permission */}
						<div>
							<Label>Рұқсат</Label>
							<Select
								value={formData.permission}
								onValueChange={value => {
									setFormData({
										...formData,
										permission: value,
									})
								}}
							>
								<SelectTrigger className=''>
									<SelectValue placeholder='Таңдалмаған' />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel className='font-bold text-sm'>
											Рұқсаттар тізімі
										</SelectLabel>
										<SelectItem value='null'>Таңдалмаған</SelectItem>
										<SelectItem value='region'>Облыс статистикасы</SelectItem>
										<SelectItem value='district'>Аудан статистикасы</SelectItem>
										<SelectItem value='village'>Округ статистикасы</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>

						{/* regions */}
						<div>
							<Label>Облыс</Label>
							<Select
								onValueChange={val => {
									setFormData({
										...formData,
										region_id: Number(val),
									})

									fetchData(`districts/${Number(val)}`).then(res => {
										setDistricts(res.data)
									})
								}}
							>
								<SelectTrigger className=''>
									<SelectValue placeholder='-----------------' />
								</SelectTrigger>
								<SelectContent>
									{regions &&
										regions.map(region => (
											<SelectItem value={String(region.id)} key={region.id}>
												{region.name}
											</SelectItem>
										))}
								</SelectContent>
							</Select>
						</div>

						{/* districts */}
						<div className='space-y-1'>
							<Label>Аудан қала</Label>
							<Select
								value={String(formData.district_id)}
								onValueChange={val => {
									setFormData({
										...formData,
										district_id: Number(val),
									})

									fetchData(`villages/${Number(val)}`).then(res => {
										setVillages(res.data)
									})
								}}
							>
								<SelectTrigger className=''>
									<SelectValue placeholder='-----------------' />
								</SelectTrigger>
								<SelectContent>
									{districts &&
										districts.map(district => (
											<SelectItem value={String(district.id)} key={district.id}>
												{district.name}
											</SelectItem>
										))}
								</SelectContent>
							</Select>
						</div>

						{/* villages */}
						<div className='space-y-1'>
							<Label>Округ</Label>
							<Select
								value={String(formData.village_id)}
								onValueChange={val => {
									setFormData({
										...formData,
										village_id: Number(val),
									})
								}}
							>
								<SelectTrigger className=''>
									<SelectValue placeholder='-----------------' />
								</SelectTrigger>
								<SelectContent>
									{villages &&
										villages.map(village => (
											<SelectItem value={String(village.id)} key={village.id}>
												{village.name}
											</SelectItem>
										))}
								</SelectContent>
							</Select>
						</div>
					</div>
					<DialogFooter>
						<Button
							type='submit'
							onClick={() => {
								fetchData('users', 'POST', formData).then(res => {
									console.log(res)
									fetchUsers()
									setModal(false)
								})

								setFormData({
									name: '',
									email: '',
									password: '',
									birthday: '',
									phone: '',
									region_id: 0,
									district_id: 0,
									village_id: 0,
									role: '',
									permission: '',
								})
							}}
						>
							Қосу
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}
