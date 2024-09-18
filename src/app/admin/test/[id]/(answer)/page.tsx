'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
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
import { Test } from '@/types/test.types'
import fetchData from '@/utils/api/fetchData'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

interface Props {
	testId: number
}

const AddOrEditswersTest: NextPage<Props> = ({ testId }) => {
	const [answer, setAnswer] = useState({
		id: 1,
		value: '',
		correct: false,
		lang: 'kk',
	})

	const fetchTest = () => {
		fetchData(`tests/${testId}`)
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
	}

	useEffect(() => {
		fetchTest()
	}, [testId])

	const [test, setTest] = useState<Test | null>()
	const [loading, setLoading] = useState(true)

	const addAnswer = () => {
		console.log(answer)
		fetchData('answers', 'POST', {
			test_id: testId,
			answer: answer.value,
			correct: answer.correct,
			lang: answer.lang,
		})
			.then(res => {
				setAnswer({
					id: 1,
					value: '',
					correct: false,
					lang: 'kk',
				})

				fetchTest()
			})
			.catch(error => {
				console.log(error)
			})
	}

	const deleteAnswer = (id: number) => {
		fetchData(`answers/${id}`, 'DELETE')
			.then(res => {
				console.log(res)
				fetchTest()
			})
			.catch(err => {
				console.log(err)
			})
	}

	return (
		<>
			<section className='mt-10'>
				<Card>
					<CardHeader>
						<CardTitle>Жауап қосу</CardTitle>
					</CardHeader>
					<CardContent>
						<div>
							{/* table */}
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>#ID</TableHead>
										<TableHead>Жауап</TableHead>
										<TableHead>Дұрыс/Бұрыс</TableHead>
										<TableHead>Тіл</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow key={answer.id}>
										<TableCell>{answer.id}</TableCell>
										<TableCell>
											<Input
												type='text'
												onChange={event => {
													setAnswer({
														...answer,
														value: event.target.value,
													})
												}}
											/>
										</TableCell>
										<TableCell>
											<Switch
												checked={answer.correct}
												onCheckedChange={val => {
													setAnswer({
														...answer,
														correct: val,
													})
												}}
											/>
										</TableCell>
										<TableCell>
											<Select
												onValueChange={val => {
													setAnswer({
														...answer,
														lang: val,
													})
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
									</TableRow>
								</TableBody>
							</Table>
						</div>
					</CardContent>

					<CardFooter>
						<Button onClick={addAnswer}>Сақтау</Button>
					</CardFooter>
				</Card>

				{/* second card */}
				<Card className='mt-10'>
					<CardHeader>
						<CardTitle>Жауаптар</CardTitle>
					</CardHeader>
					<CardContent>
						<div>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>#ID</TableHead>
										<TableHead>Жауап</TableHead>
										<TableHead>Дұрыс/Бұрыс</TableHead>
										<TableHead>Тіл</TableHead>
										<TableHead></TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{test &&
										test.answers.map(item => (
											<TableRow key={item.id}>
												<TableCell>{item.id}</TableCell>
												<TableCell className='w-[60%]'>{item.answer}</TableCell>
												<TableCell>
													{item.correct ? 'Дұрыс' : 'Бұрыс'}
												</TableCell>
												<TableCell>{item.lang}</TableCell>
												<TableCell>
													<Button
														className='bg-red-500 hover:bg-red-600'
														onClick={() => deleteAnswer(item.id)}
													>
														Жою
													</Button>
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			</section>
		</>
	)
}

export default AddOrEditswersTest
