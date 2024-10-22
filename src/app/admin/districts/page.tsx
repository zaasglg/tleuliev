'use client'

import { useEffect, useState } from 'react'

import Loading from '@/app/profile/loading'
import { BreadcrumbsCustom } from '@/components/breadcrumbs-custom'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
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
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Districts, Regions } from '@/types/region.types'
import fetchData from '@/utils/api/fetchData'
import { ListPlus } from 'lucide-react'

export default function Page() {
	const [districts, setDistricts] = useState<Districts[]>()
	const [regions, setRegions] = useState<Regions[]>()
	const [loading, setLoading] = useState(true)
	const [modal, setModal] = useState(false)

	const [formData, setFormData] = useState({
		name: '',
		regionId: 0,
	})

	const fetchDistricts = () => {
		fetchData('districts').then(res => {
			setDistricts(res.data)
			setLoading(false)
		})
	}

	useEffect(() => {
		fetchDistricts()

		fetchData('regions').then(res => {
			setRegions(res.data)
		})
	}, [])

	return (
		<>
			<section>
				<div className='flex justify-between items-center gap-10'>
					<div>
						<h2 className='text-lg lg:text-4xl font-bold'>Аудан қала</h2>
					</div>

					<div className='flex items-center space-x-3'>
						<Dialog open={modal} onOpenChange={setModal}>
							<DialogTrigger asChild>
								<Button variant='outline'>
									<span className='hidden lg:block'>Қосу</span>
									<ListPlus className='' />
								</Button>
							</DialogTrigger>
							<DialogContent className='sm:max-w-[425px]'>
								<DialogHeader>
									<DialogTitle>Жаңа аудан қосу</DialogTitle>
								</DialogHeader>
								<div>
									<div>
										<Label htmlFor='regionId' className='text-right'>
											Облыс
										</Label>
										<Select
											onValueChange={val => {
												setFormData({
													...formData,
													regionId: Number(val),
												})
											}}
										>
											<SelectTrigger className=''>
												<SelectValue placeholder='-----------------' />
											</SelectTrigger>
											<SelectContent>
												{regions &&
													regions.map(region => (
														<SelectItem
															value={String(region.id)}
															key={region.id}
														>
															{region.name}
														</SelectItem>
													))}
											</SelectContent>
										</Select>
									</div>
									<div className='mt-4'>
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
								</div>
								<DialogFooter>
									<Button
										type='submit'
										onClick={() => {
											fetchData('districts', 'POST', {
												name: formData.name,
												region_id: formData.regionId,
											}).then(res => {
												fetchDistricts()
												setFormData({
													name: '',
													regionId: 0,
												})
												setModal(false)
												console.log(res)
											})
										}}
									>
										Қосу
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</div>
				{/*breadcrumb*/}
				<BreadcrumbsCustom items={['Админ', 'Аудан қала']} />

				<div className='mt-5 grid grid-cols-1 lg:grid-cols-5 gap-3 lg:gap-10 items-end'>
					<div className='lg:col-span-2'>
						<Label>Іздеу</Label>
						<Input
							onChange={val => {
								fetchData('seach/districts', 'POST', {
									name: val.target.value,
								}).then(res => {
									setDistricts(res.data)
								})
							}}
						/>
					</div>

					<div className='lg:col-span-2'>
						<Label>Облыс бойынша сұрыптау</Label>
						<Select
							onValueChange={val => {
								fetchData(`districts/${val}`).then(res => {
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

					<div>
						<Button
							onClick={() => {
								fetchDistricts()
							}}
						>
							Барлығын көрсету
						</Button>
					</div>
				</div>
			</section>
			{loading && <Loading />}
			<section className='mt-10'>
				{!loading && (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Облыс</TableHead>
								<TableHead>Аты</TableHead>
								<TableHead>Әрекет</TableHead>
								<TableHead>Әрекет</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{districts?.map(district => (
								<TableRow key={district.id}>
									<TableCell className='font-medium'>
										{district.region.name}
									</TableCell>
									<TableCell className='font-medium'>{district.name}</TableCell>
									<TableCell>
										<Popover>
											<PopoverTrigger asChild>
												<Button>Өзгерту</Button>
											</PopoverTrigger>
											<PopoverContent className='w-80'>
												<div className='grid gap-4'>
													<div>
														<div className='mt-3'>
															<Label htmlFor='width'>Атауы</Label>
															<Input
																id='width'
																value={formData.name}
																onChange={event =>
																	setFormData({
																		...formData,
																		name: event.target.value,
																	})
																}
															/>
														</div>
													</div>

													<div>
														<Button
															className='bg-blue-500 hover:bg-blue-600'
															onClick={() => {
																fetchData(`districts/${district.id}`, 'PUT', {
																	name: formData.name,
																	region_id: district.region.id,
																}).then(res => {
																	fetchDistricts()
																	setFormData({
																		name: '',
																		regionId: 0,
																	})
																	console.log(res)
																})
															}}
														>
															өзгерту
														</Button>
													</div>
												</div>
											</PopoverContent>
										</Popover>
									</TableCell>
									<TableCell>
										<AlertDialog>
											<AlertDialogTrigger asChild>
												<Button className='bg-red-500 hover:bg-red-600'>
													Жою
												</Button>
											</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>
														Осы ауданды жоюға келісесіз бе?
													</AlertDialogTitle>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>Бас тарту</AlertDialogCancel>
													<AlertDialogAction
														className='bg-red-500 hover:bg-red-600'
														onClick={() => {
															fetchData(
																`districts/${district.id}`,
																'DELETE'
															).then(res => {
																console.log(res)
																fetchDistricts()
															})
														}}
													>
														Жою
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</section>
		</>
	)
}
