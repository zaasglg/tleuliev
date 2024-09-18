'use client'

import { BreadcrumbsCustom } from '@/components/breadcrumbs-custom'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import fetchData from '@/utils/api/fetchData'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AddOrEditswersTest from './(answer)/page'

export default function Page({ params }: { params: { id: number } }) {
	const [question, setQuestion] = useState({
		question: '',
		question_ru: '',
		key: '',
	})

	useEffect(() => {
		fetchData(`tests/${params.id}`)
			.then(res => {
				if (res.status === 200) {
					setQuestion(res.data)
					// console.log(res.data)
				}
			})
			.catch(error => {
				console.error('Failed to fetch user data:', error)
			})
	}, [])

	const router = useRouter()
	const { toast } = useToast()

	return (
		<>
			{/* ? header block */}
			<section>
				<div className='flex justify-between items-center gap-10'>
					<div>
						<h2 className='text-4xl font-medium'>Тест қосу</h2>
					</div>
				</div>

				{/*breadcrumb*/}
				<BreadcrumbsCustom items={['Админ', 'Тест']} />
			</section>

			{/* main block */}
			<section className='mt-10'>
				<Card className=''>
					<CardHeader>
						<CardTitle className='text-xl font-medium'>Тест қосу</CardTitle>
					</CardHeader>
					<CardContent>
						<form>
							<div className='grid w-full items-center gap-4'>
								<div className='flex flex-col space-y-1.5'>
									<Label htmlFor='key'>Key</Label>
									<Input
										id='key'
										value={question.key}
										onChange={event => {
											setQuestion({ ...question, key: event.target.value })
										}}
									/>
								</div>
								<div className='flex flex-col space-y-1.5'>
									<Label htmlFor='question'>Cұрақ (Қазақша)</Label>
									<Input
										id='question'
										value={question.question}
										onChange={event => {
											setQuestion({ ...question, question: event.target.value })
										}}
									/>
								</div>
								<div className='flex flex-col space-y-1.5'>
									<Label htmlFor='question_ru'>Cұрақ (Руский)</Label>
									<Input
										id='question_ru'
										value={question.question_ru}
										onChange={event => {
											setQuestion({
												...question,
												question_ru: event.target.value,
											})
										}}
									/>
								</div>
							</div>
						</form>
					</CardContent>
					<CardFooter className='flex space-x-3'>
						<Button
							onClick={res => {
								fetchData(`tests/${params.id}`, 'PUT', question)
									.then(res => {})
									.finally(() => {
										toast({
											title: 'Сұрауыңыз сәтті орындалды ',
											description: 'Сіз тестті сәтті өзгерттіңіз',
											action: (
												<ToastAction
													onClick={() => router.push('/admin/test')}
													altText='Goto schedule to undo'
												>
													Артқа
												</ToastAction>
											),
										})
									})
							}}
						>
							Сақтау
						</Button>
					</CardFooter>
				</Card>
			</section>

			{/* answer block */}
			<AddOrEditswersTest testId={params.id} />
		</>
	)
}
