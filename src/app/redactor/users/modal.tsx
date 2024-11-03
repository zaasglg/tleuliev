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
import { API_ENDPOINTS } from '@/utils/endpoint'
import { ListPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { MaskedInput } from 'react-text-input-mask'

export default function CreateUserModal({
	fetchUsers,
}: {
	fetchUsers: () => void
}) {
	const [modal, setModal] = useState(false)
	const [userData, setUserData] = useState<User | null>()
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
		role: 'user',
	})

	useEffect(() => {
		fetchData('regions').then(res => {
			setRegions(res.data)
		})

		fetchData(API_ENDPOINTS.user).then(res => {
			console.log(res)
			if (res.status === 200) {
				setUserData(res.data)

				if (res.data.role[0] == 'region_admin') {
					setFormData({
						...formData,
						region_id: res.data.region_id,
					})

					fetchData(`districts/${res.data.region_id}`).then(res => {
						setDistricts(res.data)
					})
				}

				if (res.data.role[0] == 'district_admin') {
					setFormData({
						...formData,
						region_id: res.data.region_id,
						district_id: res.data.district_id,
					})

					fetchData(`villages/${res.data.district_id}`).then(res => {
						setVillages(res.data)
					})
				}

				if (res.data.role[0] == 'village_admin') {
					setFormData({
						...formData,
						region_id: res.data.region_id,
						district_id: res.data.district_id,
						village_id: res.data.village_id,
					})
				}
			}
		})
	}, [])

	return (
		<>
			<Dialog open={modal} onOpenChange={setModal}>
				<DialogTrigger asChild>
					<Button variant='outline'>
						<span className='hidden lg:block'>
							<span className='hidden lg:block'>Маман қосу</span>
							<ListPlus className='block lg:hidden' />
						</span>
						<ListPlus className='block lg:hiden' />
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

						{/* districts */}
						{userData?.role[0] == 'district_admin' ||
						userData?.role[0] == 'village_admin' ? null : (
							<div className='space-y-1'>
								<Label>Аудан қала</Label>
								<Select
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
						{userData?.role[0] == 'village_admin' ? null : (
							<div className='space-y-1'>
								<Label>Округ</Label>
								<Select
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

								fetchData('users', 'POST', formData).then(res => {
									fetchUsers()
									setModal(false)
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
