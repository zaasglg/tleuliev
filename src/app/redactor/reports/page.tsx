'use client'

import { useEffect, useState } from 'react'

import Loading from '@/app/profile/loading'
import { BreadcrumbsCustom } from '@/components/breadcrumbs-custom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import fetchData from '@/utils/api/fetchData'
import { ListPlus, Settings2 } from 'lucide-react'
import CreateReportProvers from './modal'

export default function Page() {
	const [modal, setModal] = useState(false)
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
	}, [])

	return (
		<>
			<section>
				<div className='flex justify-between items-center gap-10'>
					<div>
						<h2 className='text-lg lg:text-4xl font-bold lg:font-medium'>
							Жылдық жоспар
						</h2>
					</div>

					<div>
						<Button variant='outline' onClick={() => setModal(true)}>
							<span className='hidden lg:block'>Маман қосу</span>
							<ListPlus className='block lg:hidden' />
						</Button>

						{/*
							// ? modal
						*/}
						<CreateReportProvers
							fetchReports={fetchReports}
							modal={modal}
							setModal={setModal}
						/>
					</div>
				</div>

				{/*breadcrumb*/}
				<BreadcrumbsCustom items={['Жылдық жоспар']} />

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
										<TableHead>Дұрыс жауабы</TableHead>
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
												<TableCell>{item.correct}</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				)}
			</section>
		</>
	)
}
