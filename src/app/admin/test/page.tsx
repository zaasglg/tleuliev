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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Test } from '@/types/test.types'
import fetchData from '@/utils/api/fetchData'
import { API_ENDPOINTS } from '@/utils/endpoint'
import { ListPlus } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
	// const { data, error, isLoading} = useTests();

	const [tests, setTests] = useState<Test[]>()
	const [filteredTests, setFilteredTests] = useState<Test[]>([])
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState('')

	const fetchTests = () =>
		fetchData('tests')
			.then(res => {
				// @ts-ignore
				setTests(res.data)
				setFilteredTests(res.data)
			})
			.finally(() => {
				setLoading(false)
			})

	useEffect(() => {
		fetchTests()
	}, [])

	const handleSearch = (value: string) => {
		fetchData(API_ENDPOINTS.seachTest(value))
			.then(res => {
				if (!value) {
					setFilteredTests(tests || [])
				} else {
					setFilteredTests(res.data)
				}
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return (
		<>
			<section>
				<div className='flex flex-wrap justify-between items-center gap-3 lg:gap-10'>
					<div>
						<h2 className='text-lg lg:text-4xl font-bold'>Тесттер</h2>
					</div>

					<div className='flex items-center space-x-3'>
						<Button variant='outline' asChild>
							<Link href='/admin/test/create'>
								<span className='hidden lg:block'>Қосу</span>
								<ListPlus className='block lg:hidden' />
							</Link>
						</Button>
					</div>
				</div>

				{/*breadcrumb*/}
				<BreadcrumbsCustom items={['Админ', 'Тесттер']} />
			</section>
			{loading && <Loading />}
			<section className='mt-10'>
				{!loading && (
					<Card className='mt-10'>
						<CardHeader>
							<CardTitle className='text-xl font-medium'>Тесттер</CardTitle>
							<Input
								placeholder='Іздеу....'
								value={search}
								onChange={event => {
									const value = event.target.value
									setSearch(event.target.value)
									handleSearch(value)
								}}
							/>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>#КЛЮЧ</TableHead>
										<TableHead>Сұрағы</TableHead>
										<TableHead></TableHead>
										<TableHead></TableHead>
										<TableHead></TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredTests &&
										filteredTests
											.slice()
											.reverse()
											.map(item => (
												<TableRow key={item.id}>
													<TableCell>#{item.key}</TableCell>
													<TableCell>{item.question}</TableCell>
													<TableCell>
														<Button>
															<Link href={`/admin/test/${item.id}`}>
																Өзгерту
															</Link>
														</Button>
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
																		Осы тестті жоюға келісесіз бе?
																	</AlertDialogTitle>
																</AlertDialogHeader>
																<AlertDialogFooter>
																	<AlertDialogCancel>
																		Бас тарту
																	</AlertDialogCancel>
																	<AlertDialogAction
																		className='bg-red-500 hover:bg-red-600'
																		onClick={() => {
																			fetchData(
																				`tests/${item.id}`,
																				'DELETE'
																			).then(res => {
																				fetchTests()
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
						</CardContent>
					</Card>
				)}
			</section>
		</>
	)
}
