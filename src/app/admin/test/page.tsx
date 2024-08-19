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
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Test } from '@/types/test.types'
import Link from 'next/link'

export default function Page() {
	// const { data, error, isLoading} = useTests();

	const [tests, setTests] = useState<Test[]>()
	const [loading, setLoading] = useState(true)

	useEffect(() => {}, [])

	return (
		<>
			<section>
				<div className='flex justify-between items-center gap-10'>
					<div>
						<h2 className='text-4xl font-medium'>Тесттер</h2>
					</div>

					<div className='flex items-center space-x-3'>
						<Button variant='outline' asChild>
							<Link href='/admin/test/create'>Қосу</Link>
						</Button>
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
							<BreadcrumbPage>Тесттер</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</section>
			{loading && <Loading />}
			<section className='mt-10'>
				{!loading && (
					<Card className='mt-10'>
						<CardHeader>
							<CardTitle className='text-xl font-medium'>Тесттер</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>#ID</TableHead>
										<TableHead>Сұрағы</TableHead>
										<TableHead></TableHead>
										<TableHead></TableHead>
										<TableHead></TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{tests &&
										tests.map(item => (
											<TableRow key={item.id}>
												<TableCell>{item.id}</TableCell>
												<TableCell>{item.question}</TableCell>
												<TableCell>
													<Button>Өзгерту</Button>
												</TableCell>

												<TableCell>
													<Button className='bg-red-500 hover:bg-red-600'>
														Жою
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
