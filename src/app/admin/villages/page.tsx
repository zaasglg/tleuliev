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
import { Regions, Villages } from '@/types/region.types'
import fetchData from '@/utils/api/fetchData'
import { ListPlus } from 'lucide-react'

export default function Page() {
	const [regions, setRegions] = useState<Regions[]>()
	const [villages, setVillages] = useState<Villages[]>()
	const [districts, setDistricts] = useState<Regions[]>()
	const [loading, setLoading] = useState(true)
	const [modal, setModal] = useState(false)

	const [formData, setFormData] = useState({
		name: '',
		districtId: 0,
		regionId: 0,
	})

	const fetchVillages = () => {
		fetchData('villages').then(res => {
			setVillages(res.data)
			setLoading(false)
		})
	}

	useEffect(() => {
		fetchVillages()

		fetchData('regions').then(res => {
			setRegions(res.data)
		})
	}, [])

	return (
		<>
			<section>
				<div className='flex justify-between items-center gap-10'>
					<div>
						<h2 className='text-lg lg:text-4xl font-bold'>Округтар</h2>
					</div>

					<div className='flex items-center space-x-3'>
						<Dialog open={modal} onOpenChange={setModal}>
							<DialogTrigger asChild>
								<Button variant='outline'>
									<span className='hidden lg:block'>Қосу</span>
									<ListPlus className='block lg:hidden' />
								</Button>
							</DialogTrigger>
							<DialogContent className='sm:max-w-[425px]'>
								<DialogHeader>
									<DialogTitle>Жаңа аудан қосу</DialogTitle>
								</DialogHeader>
								<div>
									<div>
										<Label htmlFor='regionId'>Облыс</Label>
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
									<div>
										<Label htmlFor='regionId'>Аудан</Label>
										<Select
											onValueChange={val => {
												setFormData({
													...formData,
													districtId: Number(val),
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
											fetchData('villages', 'POST', {
												name: formData.name,
												district_id: formData.districtId,
											}).then(res => {
												fetchVillages()
												setFormData({
													name: '',
													regionId: 0,
													districtId: 0,
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
				<BreadcrumbsCustom items={['Админ', 'Округтар']} />

				<div className='mt-5 grid grid-cols-1 lg:grid-cols-4 gap-3 lg:gap-5 items-end'>
					<div>
						<Label>Іздеу</Label>
						<Input
							onChange={val => {
								fetchData('search/villages', 'POST', {
									name: val.target.value,
								}).then(res => {
									setVillages(res.data)
								})
							}}
						/>
					</div>

					<div>
						<Label>Облыс бойынша сұрыптау</Label>
						<Select
							onValueChange={val => {
								fetchData(`districts/${val}`).then(res => {
									setDistricts(res.data)
								})
								fetchData(`seach/villages/${val}`).then(res => {
									setVillages(res.data)
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
						<Label>Аудан бойынша сұрыптау</Label>
						<Select
							onValueChange={val => {
								fetchData(`seach/villages/${val}`).then(res => {
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

					<div>
						<Button
							onClick={() => {
								fetchVillages()
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
								<TableHead>Аудан</TableHead>
								<TableHead>Аты</TableHead>
								<TableHead>Әрекет</TableHead>
								<TableHead>Әрекет</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{villages?.map(village => (
								<TableRow key={village.id}>
									<TableCell className='font-medium'>
										{village.district.name}
									</TableCell>
									<TableCell className='font-medium'>{village.name}</TableCell>
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
																fetchData(`villages/${village.id}`, 'PUT', {
																	name: formData.name,
																	district_id: village.district.id,
																}).then(res => {
																	fetchVillages()
																	setFormData({
																		name: '',
																		regionId: 0,
																		districtId: 0,
																	})
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
														Осы округты жоюға келісесіз бе?
													</AlertDialogTitle>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>Бас тарту</AlertDialogCancel>
													<AlertDialogAction
														className='bg-red-500 hover:bg-red-600'
														onClick={() => {
															fetchData(
																`villages/${village.id}`,
																'DELETE'
															).then(res => {
																console.log(res)
																fetchVillages()
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
