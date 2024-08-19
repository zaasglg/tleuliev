'use client'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Link from 'next/link'

import Loading from '@/app/profile/loading'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import { Test } from '@/types/test.types'
import fetchData from '@/utils/api/fetchData'
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
		fetchData(`tests/${params.id}`)
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
	}, [])

	const handleSubmit = async () => {
		try {
			fetchData('user-answers', 'POST', {
				test_id: params.id,
				answer_id: answer,
			})
				.then(res => {
					console.log(res.data.answer.correct)
					fetchData('user/update/reports/done', 'POST', {
						correct: res.data.answer.correct,
					}).then(res => {
						console.log(res)
					})
				})
				.finally(() => {
					toast({
						title: 'Сұрауыңыз сәтті орындалды ',
						description:
							'Өзіңіз берген жауаптарды статистика бөлімінен көре аласыз',
					})
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
				<Breadcrumb className='mt-5'>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink>Басты бет</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink>Тесттер</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>
								{!loading ? (
									`Тест #${test && test.key}`
								) : (
									<Skeleton className='bg-gray-300 w-9 h-2 rounded' />
								)}
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</section>

			{loading && <Loading />}

			{!loading && (
				<section className='mt-5'>
					<Card>
						<CardHeader>
							<CardTitle className='text-xl font-normal'>
								{test && test.question}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<RadioGroup onValueChange={value => setAnswer(value)}>
								{test &&
									test.answers.map(answer => (
										<div
											key={answer.id}
											className='flex items-center space-x-2'
										>
											<RadioGroupItem value={answer.id.toString()} />
											<Label htmlFor='option-one'>{answer.answer}</Label>
										</div>
									))}
							</RadioGroup>
						</CardContent>

						<CardFooter>
							<Button className='space-x-3' onClick={handleSubmit}>
								<span className='uppercase'>Жауапты қабылдау</span>
								<CheckCheck size={18} />
							</Button>
						</CardFooter>
					</Card>
				</section>
			)}
		</>
	)
}
