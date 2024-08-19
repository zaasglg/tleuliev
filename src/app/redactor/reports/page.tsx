'use client'

import { useEffect, useState } from 'react'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import Loading from '@/app/profile/loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import {
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { User } from '@/types/user.types'
import fetchData from '@/utils/api/fetchData'
import { Dialog } from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { Check, ChevronsUpDown, Settings2 } from 'lucide-react'

export default function Page() {
	const [modal, setModal] = useState(false)
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState('')
	const [formData, setFormData] = useState({
		user_id: 0,
		plan: '0',
	})

	// ? Report
	const [reports, setReports] = useState<{
		loading: boolean
		result: Report[]
		error: string
	}>({
		loading: true,
		result: [],
		error: '',
	})

	const [users, setUsers] = useState<{
		loading: boolean
		result: User[]
		error: string
	}>({
		loading: true,
		result: [],
		error: '',
	})

	const fetchReports = () => {
		fetchData('reports').then(res => {
			if (res.status === 200) {
				setReports({
					loading: false,
					result: res.data,
					error: '',
				})
			} else {
				console.error('Error fetching data:', res.message)
			}
		})
	}

	useEffect(() => {
		// ? fetch reports
		fetchReports()

		// ? fetch users
		fetchData('users').then(res => {
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
			<section>
				<div className='flex justify-between items-center gap-10'>
					<div>
						<h2 className='text-4xl font-medium'>Жылдық жоспар</h2>
					</div>

					<div>
						<Button variant='outline' onClick={() => setModal(true)}>
							Маман қосу
						</Button>

						{/* 
							// ? modal 
						*/}
						<Dialog open={modal}>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Маман қосу</DialogTitle>
								</DialogHeader>
								<div className='space-y-3'>
									<div>
										<Label>Маман</Label>
										<Popover open={open} onOpenChange={setOpen}>
											<PopoverTrigger asChild>
												<Button
													variant='outline'
													role='combobox'
													aria-expanded={open}
													className='w-full justify-between'
												>
													{value
														? users.result.find(user => user.name === value)
																?.name
														: 'Маманды тандаңы...'}
													<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
												</Button>
											</PopoverTrigger>
											<PopoverContent className='w-[450px]'>
												<Command>
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
																		setValue(
																			currentValue === value ? '' : currentValue
																		)
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
																			value === user.name
																				? 'opacity-100'
																				: 'opacity-0'
																		)}
																	/>
																	{user.name}
																</CommandItem>
															))}
														</CommandGroup>
													</CommandList>
												</Command>
											</PopoverContent>
										</Popover>
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
					</div>
				</div>

				{/*breadcrumb*/}
				<Breadcrumb className='mt-5'>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink>Басты бет</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Жылдық жоспа</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</section>

			{reports.loading && <Loading />}

			{!reports.loading && (
				<Card className='mt-10'>
					<CardHeader>
						<CardTitle className='text-xl font-medium'>
							Жылдық қорытынды
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Маманның А.Т.Ә.</TableHead>
									<TableHead>Жылдық жоспар</TableHead>
									<TableHead>Орындалғаны</TableHead>
									<TableHead>%</TableHead>
									<TableHead>Дұрыс жауабы</TableHead>
									<TableHead>%</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{reports &&
									reports.result.map(item => (
										<TableRow key={item.id}>
											<TableCell>{item.user.name}</TableCell>
											<TableCell className='flex items-center space-x-3'>
												<span>{item.plan}</span>
												<Popover>
													<PopoverTrigger>
														<Settings2 size={15} />
													</PopoverTrigger>
													<PopoverContent>
														<div>
															<Label>Жылдық жоспарды өзгерту</Label>
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

														<Button
															className='mt-4'
															onClick={() => {
																fetchData(
																	`admin/update/reports/plan/${item.id}`,
																	'POST',
																	{
																		plan: formData.plan,
																	}
																).then(res => {
																	fetchReports()
																})
															}}
														>
															өзгерту
														</Button>
													</PopoverContent>
												</Popover>
											</TableCell>
											<TableCell>{item.done}</TableCell>
											<TableCell>{item.done_pct} %</TableCell>
											<TableCell>{item.correct}</TableCell>
											<TableCell>{item.correct_pct} %</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			)}
		</>
	)
}
