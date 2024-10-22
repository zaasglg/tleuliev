'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Link from 'next/link'

import Loading from '@/app/profile/loading'
import { BreadcrumbsCustom } from '@/components/breadcrumbs-custom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import { Test } from '@/types/test.types'
import fetchData from '@/utils/api/fetchData'
import { API_ENDPOINTS } from '@/utils/endpoint'
import { CheckCheck, ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function TestDetail({ params }: { params: { id: number } }) {
	const [answer, setAnswer] = useState('')

	const [test, setTest] = useState<Test | null>()
	const [loading, setLoading] = useState(true)

	const router = useRouter()

	const { toast } = useToast()

	useEffect(() => {
		fetchData(API_ENDPOINTS.testDetail(params.id))
			.then(res => {
				if (res.status === 200) {
					setTest(res.data)
				}
			})
			.catch(error => {
				console.error('Failed to fetch user data:', error)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [params.id])

	const handleSubmit = async () => {
		try {
			fetchData(API_ENDPOINTS.userAnswers, 'POST', {
				test_id: params.id,
				answer_id: answer,
			})
				.then(res => {
					fetchData(API_ENDPOINTS.userReportsDone, 'POST', {
						correct: res.data.answer.correct,
					}).then(res => {})
				})
				.finally(() => {
					router.push('/result')
				})
		} catch (error) {
			// @ts-ignore
			console.log(error.message)
		}
	}

	return (
		<>
			<section>
				<div className='flex justify-between items-center gap-10'>
					<div className='flex items-center space-x-2'>
						<Button variant='outline' className='w-9 h-9 p-2' asChild>
							<Link href='/test'>
								<ChevronLeft />
							</Link>
						</Button>
						<h2 className='text-4xl font-medium'>
							{!loading ? (
								`Тест #${test && test.key}`
							) : (
								<Skeleton className='bg-gray-300 w-24 h-4 rounded' />
							)}
						</h2>
					</div>
				</div>

				{/*breadcrumb*/}
				<BreadcrumbsCustom items={[`Тест ${test?.key}`]} />
			</section>

			{loading && <Loading />}

			{!loading && (
				<section className='mt-5'>
					<Card>
						<CardHeader>
							<CardTitle className='flex items-center space-x-3'>
								<Badge>Қазақша</Badge>
								<span>{test && test.question}</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<RadioGroup
								value={answer}
								onValueChange={value => setAnswer(value)}
							>
								{test &&
									test.answers.map(
										answer =>
											answer.lang === 'kk' && (
												<div
													key={answer.id}
													className='flex items-center space-x-2'
												>
													<RadioGroupItem
														value={answer.id.toString()}
														id={answer.id.toString()}
													/>
													<Label
														htmlFor={answer.id.toString()}
														className='text-sm font-light leading-none'
													>
														{answer.answer}
													</Label>
												</div>
											)
									)}
							</RadioGroup>
						</CardContent>
					</Card>

					<Card className='mt-5'>
						<CardHeader>
							<CardTitle className='flex items-center space-x-3'>
								<Badge>Руский</Badge>
								<span>{test && test.question_ru}</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<RadioGroup
								value={answer}
								onValueChange={value => setAnswer(value)}
							>
								{test &&
									test.answers.map(
										answer =>
											answer.lang === 'ru' && (
												<div
													key={answer.id}
													className='flex items-center space-x-2'
												>
													<RadioGroupItem
														value={answer.id.toString()}
														id={answer.id.toString()}
													/>
													<Label
														htmlFor={answer.id.toString()}
														className='text-sm font-light leading-none'
													>
														{answer.answer}
													</Label>
												</div>
											)
									)}
							</RadioGroup>
						</CardContent>
					</Card>

					<div className='mt-5'>
						<Button className='space-x-3' onClick={handleSubmit}>
							<span className='uppercase'>Жауапты қабылдау</span>
							<CheckCheck size={18} />
						</Button>
					</div>
				</section>
			)}
		</>
	)
}
