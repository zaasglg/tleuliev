'use client'

import { BreadcrumbsCustom } from '@/components/breadcrumbs-custom'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
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
import { useState } from 'react'
import AddOrEditswersTest from '../[id]/(answer)/page'

export default function Page() {
	const [question, setQuestion] = useState({
		question: '',
		question_ru: '',
		key: '',
	})

	const router = useRouter()
	const { toast } = useToast()

	const [testId, setTestId] = useState<number>(0)

	return (
		<>
			{/* header */}
			<section>
				<div className='flex justify-between items-center gap-10'>
					<div>
						<h2 className='text-4xl font-medium'>Тест қосу</h2>
					</div>
				</div>

				{/*breadcrumb*/}
				<BreadcrumbsCustom items={['Админ', 'Тест']} />
			</section>

			{/* main section */}
			<section className='mt-10'>
				<Card className=''>
					<CardHeader>
						<CardTitle>Тест қосу</CardTitle>
						<CardDescription>
							Ең алдымен тест сұрақтарың еңгізіп, Сақтау батырмасын басыңыз.
							Әрекет сәтті орындалғанына көз жеткізгенен соң жауаптарды еңгізуді
							бастаңыз
						</CardDescription>
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
						{/* <Button
							variant='outline'
							onClick={() => {
								setAnswers([
									...answers,
									{
										id: answers[answers.length - 1].id + 1,
										value: '',
										correct: false,
										lang: 'kk',
									},
								])
							}}
						>
							Жауап қосу
						</Button> */}
						<Button
							onClick={res => {
								fetchData('tests', 'POST', question)
									.then(res => {
										setTestId(res.data['id'])
									})
									.finally(() => {
										toast({
											title: 'Сұрауыңыз сәтті орындалды ',
											description: 'Сіз тестті сәтті Қостыңыз',
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

			{/* answer section */}
			<AddOrEditswersTest testId={testId} />
		</>
	)
}
