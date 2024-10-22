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
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Regions } from '@/types/region.types'
import fetchData from '@/utils/api/fetchData'
import { ListPlus } from 'lucide-react'

export default function Page() {
	const [regions, setRegions] = useState<Regions[]>()
	const [loading, setLoading] = useState(true)
	const [modal, setModal] = useState(false)

	const [regionName, setRegionName] = useState('')

	const fetchRegions = () => {
		fetchData('regions').then(res => {
			console.log(res)
			setRegions(res.data)
			setLoading(false)
		})
	}

	useEffect(() => {
		fetchRegions()
	}, [])

	return (
		<>
			<section>
				<div className='flex justify-between items-center gap-10'>
					<div>
						<h2 className='text-lg lg:text-4xl font-bold'>Облыстар</h2>
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
									<DialogTitle>Жаңа облыс қосу</DialogTitle>
								</DialogHeader>
								<div className='grid gap-4 py-4'>
									<div className='grid grid-cols-4 items-center gap-4'>
										<Label htmlFor='name' className='text-right'>
											Аты
										</Label>
										<Input
											id='name'
											defaultValue='Pedro Duarte'
											className='col-span-3'
											value={regionName}
											onChange={event => setRegionName(event?.target.value)}
										/>
									</div>
								</div>
								<DialogFooter>
									<Button
										type='submit'
										onClick={() => {
											fetchData('regions', 'POST', {
												name: regionName,
											}).then(res => {
												fetchRegions()
												setRegionName('')
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
				<BreadcrumbsCustom items={['Админ', 'Облыстар']} />
			</section>
			{loading && <Loading />}
			<section className='mt-10'>
				{!loading && (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Аты</TableHead>
								<TableHead>Әрекет</TableHead>
								<TableHead>Әрекет</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{regions?.map(region => (
								<TableRow key={region.id}>
									<TableCell className='font-medium'>{region.name}</TableCell>
									<TableCell>
										<Popover>
											<PopoverTrigger asChild>
												<Button>Өзгерту</Button>
											</PopoverTrigger>
											<PopoverContent className='w-80'>
												<div className='grid gap-4'>
													<div className='grid gap-2'>
														<div className='grid grid-cols-3 items-center gap-4'>
															<Label htmlFor='width'>Атауы</Label>
															<Input
																id='width'
																defaultValue={region.name}
																className='col-span-2 h-8'
																value={regionName}
																onChange={event =>
																	setRegionName(event?.target.value)
																}
															/>
														</div>
													</div>

													<div>
														<Button
															className='bg-blue-500 hover:bg-blue-600'
															onClick={() => {
																fetchData(`regions/${region.id}`, 'PUT', {
																	name: regionName,
																}).then(res => {
																	fetchRegions()
																	setRegionName('')
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
														Осы облысты жоюға келісесіз бе?
													</AlertDialogTitle>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>Бас тарту</AlertDialogCancel>
													<AlertDialogAction
														className='bg-red-500 hover:bg-red-600'
														onClick={() => {
															fetchData(`regions/${region.id}`, 'DELETE').then(
																res => {
																	console.log(res)
																	fetchRegions()
																}
															)
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
