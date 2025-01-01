import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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

	const [formData, setFormData] = useState({
		name: '',
		password: '',
		phone: '',
		region_id: 0,
		role: 'viewer_only'
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
						<span className='hidden lg:block'>Статистика админ қосу</span>
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
										phone: String(val.target.value).replace(/\D/g, ''),
									})
								}}
							>
								<Input id='phone' type='text' />
							</MaskedInput>
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


						{/* regions */}
						{
							formData.role == "viewer_only" ? (
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
							) : null
						}

						<div>
							<div className="flex h-full items-end pb-3 space-x-2">
								<Checkbox id="viewer_only_all" onCheckedChange={(val) => {
									if (val == true) {
										setFormData({
											...formData,
											role: 'viewer_only_all'
										})
									} else {
										setFormData({
											...formData,
											role: 'viewer_only'
										})
									}
								}} />
								<label
									htmlFor="viewer_only_all"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Қазақстан бойынша
								</label>
							</div>
						</div>

					</div>
					<DialogFooter>
						<Button
							type='submit'
							onClick={() => {
								
								fetchData('users', 'POST', formData).then(res => {
									fetchUsers()
									setModal(false)
								})

								setFormData({
									name: '',
									password: '',
									phone: '',
									region_id: 0,
									role: 'viewer_only'
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
