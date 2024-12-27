import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { User } from '@/types/user.types'
import fetchData from '@/utils/api/fetchData'
import clsx from 'clsx'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export default function CreateReportProvers({
	fetchReports,
	modal,
	setModal,
}: {
	fetchReports: () => void
	modal: boolean
	setModal: Dispatch<SetStateAction<boolean>>
}) {
	// const [modal, setModal] = useState(false)
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState('')

	const [users, setUsers] = useState<{
		loading: boolean
		result: User[]
		error: string
	}>({
		loading: true,
		result: [],
		error: '',
	})

	const [formData, setFormData] = useState({
		user_id: 0,
		plan: '0',
		year: '2025'
	})

	useEffect(() => {
		// ? fetch users
		fetchData('filter/users/location').then(res => {
			if (res.status === 200) {
				setUsers({
					loading: false,
					result: res.data,
					error: '',
				})
			} else {
				console.error('Error fetching data:', res.message)
			}
		})
	}, [])

	return (
		<>
			<Dialog open={modal} onOpenChange={setModal}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Маман қосу</DialogTitle>
					</DialogHeader>
					<div className='space-y-3'>
						<div>
							<Label>Маман</Label>
							<Button
								variant='outline'
								role='combobox'
								aria-expanded={open}
								className='w-full justify-between'
								onClick={() => {
									setOpen(!open)
								}}
							>
								{value
									? users.result.find(user => user.name === value)?.name
									: 'Маманды тандаңы...'}
								<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
							</Button>

							{/* 
                // ? search users 
              */}
							{open && (
								<Command className='my-4 border shadow-md'>
									<CommandInput placeholder='маманды іздеу...' />
									<CommandList>
										<CommandEmpty>Қолданушы табылмады.</CommandEmpty>
										<CommandGroup>
											{users.result.map(user => (
												<CommandItem
													key={user.id}
													value={user.name}
													className='w-full'
													onSelect={currentValue => {
														setValue(currentValue === value ? '' : currentValue)
														setFormData({
															...formData,
															user_id: user.id,
														})
														setOpen(false)
													}}
												>
													<Check
														className={clsx(
															'mr-2 h-4 w-4',
															value === user.name ? 'opacity-100' : 'opacity-0'
														)}
													/>
													{user.name}
												</CommandItem>
											))}
										</CommandGroup>
									</CommandList>
								</Command>
							)}
						</div>

						<div className='mt-5'>
							<Label>Жылдық жоспар</Label>
							<Input
								value={formData.plan}
								onChange={event => {
									setFormData({
										...formData,
										plan: event.target.value,
									})
								}}
							/>
						</div>

						<div className='mt-5'>
							<Label>Жыл</Label>
							<Select 
								onValueChange={val => {
									setFormData({
										...formData,
										year: val,
									})
								}}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Жылды тандаңыз" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Жыл</SelectLabel>
										<SelectItem value="2025">2025</SelectItem>
										<SelectItem value="2026">2026</SelectItem>
										<SelectItem value="2027">2027</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>

						<Button
							type='button'
							onClick={() => {
								fetchData('reports', 'POST', formData).then(res => {
									fetchReports()
									setModal(false)
								})
							}}
						>
							Сақтау
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}
