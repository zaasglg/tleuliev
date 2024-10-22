'use client'

import { CheckCheck, Minus } from 'lucide-react'
import { useEffect, useState } from 'react'

import Loading from '@/app/profile/loading'
import { BreadcrumbsCustom } from '@/components/breadcrumbs-custom'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { UserAnswer } from '@/types/user-answer.types'
import fetchData from '@/utils/api/fetchData'
import { API_ENDPOINTS } from '@/utils/endpoint'
import { Label } from '@radix-ui/react-label'
import Link from 'next/link'

export default function Page() {
	// user answers
	const [userAnswers, setUserAnswers] = useState<{
		loading: boolean
		results: UserAnswer[]
		error: string | null
	}>({
		loading: true,
		results: [],
		error: null,
	})

	const [resultUser, setResultUser] = useState<{
		loading: boolean
		result: Report | null
		error: string | null
	}>({
		loading: true,
		result: null,
		error: null,
	})

	useEffect(() => {
		// fetch answers
		fetchData(API_ENDPOINTS.fetchUserAnswers)
			.then(res => {
				if (res.status === 200) {
					setUserAnswers({
						loading: false,
						results: res.data,
						error: '',
					})
				}
			})
			.finally(() => {
				setUserAnswers(prevState => ({
					...prevState,
					loading: false,
				}))
			})

		fetchData(API_ENDPOINTS.fetchUserReports).then(res => {
			if (res.status === 200) {
				console.log(res)
				setResultUser({
					loading: false,
					result: res.data,
					error: null,
				})
			}
		})
	}, [])

	return (
		<>
			<section>
				<div className='flex justify-between items-center gap-10'>
					<div>
						<h2 className='text-4xl font-medium'>
							Статистика {userAnswers.loading}
						</h2>
					</div>
				</div>

				{/*breadcrumb*/}
				<BreadcrumbsCustom items={['Статистика']} />
			</section>

			{userAnswers.loading && <Loading />}

			{!userAnswers.loading && (
				<section className='mt-10'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
						<Card>
							<CardHeader>
								<CardDescription>тапсырған тесттер</CardDescription>
								<CardTitle>
									{resultUser.result?.done} / {resultUser.result?.plan}
								</CardTitle>
							</CardHeader>

							<CardContent>
								<Progress
									value={Number(resultUser.result?.done_pct)}
									max={Number(resultUser.result?.plan)}
								/>
								<Label className='text-xs text-gray-500'>
									{resultUser.result?.done_pct} %
								</Label>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardDescription>Сізге қойылған тапсырмалар</CardDescription>
								<CardTitle>
									{Number(resultUser.result?.plan) -
										Number(resultUser.result?.done)}
									<span className='font-normal'> тапсырма</span>
								</CardTitle>
							</CardHeader>

							<CardContent>
								<Button asChild>
									<Link href='/test'>Тапсырмаларды қарау</Link>
								</Button>
							</CardContent>
						</Card>
					</div>

					<Card className='mt-3'>
						<CardHeader>
							<CardTitle>Статистика</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Ключ</TableHead>
										<TableHead>Тест сұрағы</TableHead>
										<TableHead>Жауабы</TableHead>
										<TableHead>Дұрыс/Бұрыс</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{userAnswers &&
										userAnswers.results.map(item => (
											<TableRow key={item.id}>
												<TableCell>#{item.test.key}</TableCell>
												<TableCell>{item.test.question}</TableCell>
												<TableCell>{item.answer.answer}</TableCell>
												<TableCell>
													{item.answer.correct ? (
														<div className='w-8 h-8 rounded-full bg-blue-500 flex justify-center items-center'>
															<CheckCheck color='white' size={18} />
														</div>
													) : (
														<div className='w-8 h-8 rounded-full bg-red-500 flex justify-center items-center'>
															<Minus color='white' size={18} />
														</div>
													)}
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</section>
			)}
		</>
	)
}
