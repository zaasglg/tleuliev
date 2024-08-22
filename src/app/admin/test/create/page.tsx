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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import fetchData from '@/utils/api/fetchData'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
	const [question, setQuestion] = useState({
		question: '',
		question_ru: '',
		key: '',
	})

	const [answers, setAnswers] = useState([
		{ id: 1, value: '', correct: false, lang: 'kk' },
	])

	const router = useRouter()
	const { toast } = useToast()

	return (
		<>
			<section>
				<div className='flex justify-between items-center gap-10'>
					<div>
						<h2 className='text-4xl font-medium'>Тест қосу</h2>
					</div>
				</div>

				{/*breadcrumb*/}
				<BreadcrumbsCustom items={['Админ', 'Тест']} />
			</section>
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

							<h2 className='mt-5 mb-1'>Жауаптар</h2>
							<div>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>#ID</TableHead>
											<TableHead>Жауап</TableHead>
											<TableHead>Дұрыс/Бұрыс</TableHead>
											<TableHead>Тіл</TableHead>
											<TableHead>Әрекет</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{answers.map(answer => (
											<TableRow key={answer.id}>
												<TableCell>{answer.id}</TableCell>
												<TableCell>
													<Input
														type='text'
														onChange={event => {
															setAnswers(
																answers.map(input =>
																	input.id === answer.id
																		? { ...input, value: event.target.value }
																		: input
																)
															)
														}}
													/>
												</TableCell>
												<TableCell>
													<Switch
														checked={answer.correct}
														onCheckedChange={val => {
															setAnswers(
																answers.map(input =>
																	input.id === answer.id
																		? { ...input, correct: val }
																		: input
																)
															)
														}}
													/>
												</TableCell>
												<TableCell>
													<Select
														onValueChange={val => {
															setAnswers(
																answers.map(input =>
																	input.id === answer.id
																		? { ...input, lang: val }
																		: input
																)
															)
														}}
													>
														<SelectTrigger className='w-[180px]'>
															<SelectValue placeholder='Тілді тандаңыз' />
														</SelectTrigger>
														<SelectContent>
															<SelectGroup>
																<SelectLabel>Тілдер</SelectLabel>
																<SelectItem value='kk'>Қазақша</SelectItem>
																<SelectItem value='ru'>Руский</SelectItem>
															</SelectGroup>
														</SelectContent>
													</Select>
												</TableCell>
												<TableCell>
													<Button
														type='button'
														disabled={answers.length === 1}
														variant='ghost'
														className='w-9 h-9 p-0 text-red-500 hover:text-red-600'
														onClick={() => {
															setAnswers(
																answers.filter(old => old.id !== answer.id)
															)
														}}
													>
														<X />
													</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</form>
					</CardContent>
					<CardFooter className='flex space-x-3'>
						<Button
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
						</Button>
						<Button
							onClick={res => {
								fetchData('tests', 'POST', question)
									.then(res => {
										answers.map(answer => {
											fetchData('answers', 'POST', {
												test_id: res.data.id,
												answer: answer.value,
												correct: answer.correct,
												lang: answer.lang,
											})
										})
									})
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
		</>
	)
}
