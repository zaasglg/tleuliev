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
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Districts, Regions, Villages } from '@/types/region.types'
import { User } from '@/types/user.types'
import fetchData from '@/utils/api/fetchData'
import { Settings2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { MaskedInput } from 'react-text-input-mask'

export default function UpdateUser({
	fetchUsers,
	user,
}: {
	fetchUsers: () => void
	user: User
}) {
	const [modal, setModal] = useState(false)

	const [regions, setRegions] = useState<Regions[] | null>()
	const [districts, setDistricts] = useState<Districts[] | null>()
	const [villages, setVillages] = useState<Villages[] | null>()

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		birthday: '',
		phone: '',
		region_id: 0,
		district_id: 0,
		village_id: 0,
		role: '',
	})

	useEffect(() => {
		setFormData({
			...formData,
			name: user.name,
			email: user.email,
			birthday: user.birthday,
			phone: String(user.phone),
			region_id: user.region_id,
			district_id: user.district_id,
			village_id: user.village_id,
		})

		fetchData('regions').then(res => {
			setRegions(res.data)
		})
	}, [])

	return (
		<>
			<Dialog open={modal} onOpenChange={setModal}>
				<DialogTrigger asChild>
					<Button variant='ghost'>
						<Settings2 size={18} />
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[50%]'>
					<DialogHeader>
						<DialogTitle>Өзгерту</DialogTitle>
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
										phone: val.target.value,
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

						{/* regions */}
						<div>
							<Label>Облыс</Label>
							<Select
								value={String(formData.region_id)}
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
						{districts && (
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
												<SelectItem
													value={String(district.id)}
													key={district.id}
												>
													{district.name}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
							</div>
						)}

						{/* villages */}
						{villages && (
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
						)}
					</div>
					<DialogFooter>
						<Button
							type='submit'
							onClick={() => {
								setFormData({
									...formData,
									phone: String(formData.phone).replace(/\D/g, ''),
								})

								fetchData(`users/${user.id}`, 'PUT', formData).then(res => {
									console.log(res)
									fetchUsers()
									setModal(false)
								})
							}}
						>
							Өзгерту
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}
