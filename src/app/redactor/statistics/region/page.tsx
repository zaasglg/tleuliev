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
import { RegionReport } from '@/types/region-report.types'
import fetchData from '@/utils/api/fetchData'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { Eye, FileDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Page() {
	const [modal, setModal] = useState(false)
	const [formData, setFormData] = useState({
		user_id: 0,
		plan: '0',
	})
	const router = useRouter()

	// ? Report
	const [reports, setReports] = useState<{
		loading: boolean
		result: RegionReport[]
		error: string
	}>({
		loading: true,
		result: [],
		error: '',
	})

	const fetchReports = () => {
		fetchData('region-reports').then(res => {
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

	const exportToExcel = () => {
		const workbook = new ExcelJS.Workbook()
		const worksheet = workbook.addWorksheet('Reports')

		// Add headers
		worksheet.columns = [
			{ header: 'Аудан атауы', key: 'distrit_name', width: 30 },
			{ header: 'Жылдық жоспар', key: 'total_plan', width: 20 },
			{ header: 'Орындалғаны', key: 'total_done', width: 20 },
			{ header: '%', key: 'done_pct', width: 10 },
			{ header: 'Дұрыс жауабы', key: 'total_correct', width: 20 },
			{ header: '%', key: 'correct_pct', width: 10 },
		]

		// Add data
		reports.result.forEach(item => {
			worksheet.addRow({
				district_name: item.district_name,
				total_plan: item.total_plan,
				total_done: item.total_done,
				done_pct: `${item.done_pct} %`,
				total_correct: item.total_correct,
				correct_pct: `${item.correct_pct} %`,
			})
		})

		// Generate Excel and save it
		workbook.xlsx.writeBuffer().then(buffer => {
			const blob = new Blob([buffer], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			})
			saveAs(blob, 'DistrictReports.xlsx')
		})
	}

	return (
		<>
			<section>
				<div className='flex justify-between items-center gap-10'>
					<div>
						<h2 className='text-lg lg:text-4xl font-bold lg:font-medium'>
							Облыс статика
						</h2>
					</div>
				</div>

				{/*breadcrumb*/}
				<BreadcrumbsCustom items={['Облыс статика']} />

				{reports.loading && <Loading />}

				{!reports.loading && (
					<Card className='mt-10'>
						<CardHeader>
							<CardTitle className='text-xl font-medium'>
								Облыс статика
							</CardTitle>
							<div>
								<Button
									onClick={exportToExcel}
									className='space-x-4 flex items-center bg-green-700 hover:bg-green-800'
								>
									<FileDown size={15} />
									<span>EXCEL</span>
								</Button>
							</div>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Аудан атауы</TableHead>
										<TableHead>Жылдық жоспар</TableHead>
										<TableHead>Орындалғаны</TableHead>
										<TableHead>%</TableHead>
										<TableHead>Дұрыс жауабы</TableHead>
										<TableHead>%</TableHead>
										<TableHead></TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{reports &&
										reports.result.map(item => (
											<TableRow key={item.district_id}>
												<TableCell>{item.district_name}</TableCell>
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
																`/redactor/statistics/district/${item.district_id}`
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
