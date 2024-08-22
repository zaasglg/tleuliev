'use client'

import { useEffect, useState } from 'react'

import Loading from '@/app/profile/loading'
import { BreadcrumbsCustom } from '@/components/breadcrumbs-custom'
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

export default function Page() {
	const [villages, setVillages] = useState<Villages[]>()
	const [districts, setDistricts] = useState<Regions[]>()
	const [loading, setLoading] = useState(true)
	const [modal, setModal] = useState(false)

	const [formData, setFormData] = useState({
		name: '',
		districtId: 0,
	})

	const fetchVillages = () => {
		fetchData('villages').then(res => {
			console.log(res)
			setVillages(res.data)
			setLoading(false)
		})
	}

	useEffect(() => {
		fetchVillages()

		fetchData('districts').then(res => {
			setDistricts(res.data)
		})
	}, [])

	return (
		<>
			<section>
				<div className='flex justify-between items-center gap-10'>
					<div>
						<h2 className='text-4xl font-medium'>Округтар</h2>
					</div>

					<div className='flex items-center space-x-3'>
						<Dialog open={modal} onOpenChange={setModal}>
							<DialogTrigger asChild>
								<Button variant='outline'>Қосу</Button>
							</DialogTrigger>
							<DialogContent className='sm:max-w-[425px]'>
								<DialogHeader>
									<DialogTitle>Жаңа аудан қосу</DialogTitle>
								</DialogHeader>
								<div>
									<div>
										<Label htmlFor='regionId' className='text-right'>
											Аудан
										</Label>
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
							{villages?.map(village => (
								<TableRow key={village.id}>
									<TableCell className='font-medium'>
										{village.district.name}
									</TableCell>
									<TableCell className='font-medium'>{village.name}</TableCell>
									<TableCell>
										<Popover>
											<PopoverTrigger asChild>
												<Button>Өңдеу</Button>
											</PopoverTrigger>
											<PopoverContent className='w-80'>
												<div className='grid gap-4'>
													<div>
														<div>
															<Label htmlFor='regionId' className='text-right'>
																Аудан
															</Label>
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
																	district_id: formData.districtId,
																}).then(res => {
																	fetchVillages()
																	setFormData({
																		name: '',
																		districtId: 0,
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
										<Button
											className='bg-red-500 hover:bg-red-600'
											onClick={() => {
												fetchData(`villages/${village.id}`, 'DELETE').then(
													res => {
														console.log(res)
														fetchVillages()
													}
												)
											}}
										>
											Жою
										</Button>
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
