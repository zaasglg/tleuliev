'use client'

import { useEffect, useState } from 'react'

import Loading from '@/app/profile/loading'
import { BreadcrumbsCustom } from '@/components/breadcrumbs-custom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { DistrictReport } from '@/types/district-report.types'
import fetchData from '@/utils/api/fetchData'
import { Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Page({ params }: { params: { id: number } }) {
	const router = useRouter()

	const [modal, setModal] = useState(false)
	const [formData, setFormData] = useState({
		user_id: 0,
		plan: '0',
	})

	// ? Report
	const [reports, setReports] = useState<{
		loading: boolean
		result: DistrictReport[]
		error: string
	}>({
		loading: true,
		result: [],
		error: '',
	})

	const fetchReports = () => {
		let url = params.id ? `district-reports/${params.id}` : `district-reports`

		fetchData(url).then(res => {
			console.log(res)
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
							Аудан статистика
						</h2>
					</div>
				</div>

				{/*breadcrumb*/}
				<BreadcrumbsCustom items={['Аудан статистика']} />

				{reports.loading && <Loading />}

				{!reports.loading && (
					<Card className='mt-10'>
						<CardHeader>
							<CardTitle className='text-xl font-medium'>
								Аудан статистика
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Округ атауы</TableHead>
										<TableHead>Жылдық жоспар</TableHead>
										<TableHead>Орындалғаны</TableHead>
										<TableHead>%</TableHead>
										<TableHead>Дұрыс жауабы</TableHead>
										<TableHead>%</TableHead>
										<TableHead>%</TableHead>
										<TableHead></TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{reports &&
										reports.result.map(item => (
											<TableRow key={item.village_id}>
												<TableCell>{item.village_name}</TableCell>
												<TableCell>{item.total_plan}</TableCell>
												<TableCell>{item.total_done}</TableCell>
												<TableCell>{item.done_pct} %</TableCell>
												<TableCell>{item.total_correct}</TableCell>
												<TableCell>{item.correct_pct} %</TableCell>
												<TableCell>
													<Button
														variant='ghost'
														onClick={() => {
															router.push(
																`/redactor/statistics/village/${item.village_id}`
															)
														}}
													>
														<Eye />
													</Button>
												</TableCell>
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
