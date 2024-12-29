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
	const [villages, setVillages] = useState<Villages[] | null>()

	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		region_id: 0,
		district_id: 0,
		village_id: 0,
		role: 'user',
	})

	useEffect(() => {
		setFormData({
			...formData,
			name: user.name,
			phone: String(user.phone),
			region_id: user.region_id ?? 0,
			district_id: user.district_id ?? 0,
			village_id: user.village_id ?? 0,
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
							<Label htmlFor='name'>Аты жөні</Label>
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
							Қосу
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}
