'use client'

import { useEffect, useState } from 'react'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { Feedback } from '@/types/feedback.types'
import fetchData from '@/utils/api/fetchData'

export default function Page() {
	const [formData, setFormData] = useState({
		title: '',
		message: '',
	})

	const [modal, setModal] = useState(false)

	const [feedbacks, setFeedbacks] = useState<{
		loading: boolean
		result: Feedback[]
		error: string
	}>({
		loading: true,
		result: [],
		error: '',
	})

	function fetchFeedbacks() {
		fetchData('user/feedbacks').then(res => {
			if (res.status === 200) {
				setFeedbacks({
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
		fetchFeedbacks()
	}, [])

	return (
		<>
			<section>
				<div className='flex justify-between items-center gap-10'>
					<div>
						<h2 className='text-4xl font-medium'>Кері байланыс</h2>
					</div>

					<div>
						<Button variant='outline' onClick={() => setModal(true)}>
							Кері байланыс қалдыру
						</Button>

						{/*modal*/}
						<Dialog open={modal}>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Кері байланыс</DialogTitle>
								</DialogHeader>
								<div className='space-y-3'>
									<div>
										<Label>Тақырыбы</Label>
										<Input
											placeholder=''
											value={formData.title}
											onChange={event => {
												setFormData({
													...formData,
													title: event.target.value,
												})
											}}
										/>
									</div>

									<div className='mt-5'>
										<Label>Пікір</Label>
										<Textarea
											placeholder=''
											value={formData.message}
											onChange={event => {
												setFormData({
													...formData,
													message: event.target.value,
												})
											}}
										/>
									</div>

									<Button
										type='button'
										onClick={() => {
											fetchData('feedbacks', 'POST', formData).then(res => {
												setModal(false)
												fetchFeedbacks()
											})
										}}
									>
										Жіберу
									</Button>
								</div>
							</DialogContent>
						</Dialog>
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
							<BreadcrumbPage>Кері байланыс</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</section>

			{feedbacks.loading && <Loading />}

			{!feedbacks.loading && (
				<Card className='mt-10'>
					<CardHeader>
						<CardTitle className='text-xl font-medium'>Пікірлер</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Тақырыбы</TableHead>
									<TableHead>Хат</TableHead>
									<TableHead>Әрекет</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{feedbacks &&
									feedbacks.result.map(item => (
										<TableRow key={item.id}>
											<TableCell>{item.title}</TableCell>
											<TableCell>{item.message}</TableCell>
											<TableCell>
												<Button
													className='bg-red-500 hover:bg-red-700'
													onClick={() => {
														fetchData(`feedbacks/${item.id}`, 'DELETE').then(
															res => {
																fetchFeedbacks()
															}
														)
													}}
												>
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
		</>
	)
}
