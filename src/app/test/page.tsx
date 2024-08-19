'use client'

import CardTest from '@/app/test/card-test'
import { Search, SquareArrowOutUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
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
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Test } from '@/types/test.types'
import fetchData from '@/utils/api/fetchData'
import Link from 'next/link'

export default function Page() {
	const [lang, setLang] = useState('kk')

	const [tests, setTests] = useState<Test[]>()
	const [results, setResults] = useState<Test[]>()
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState('')

	useEffect(() => {
		fetchData(`user/tests/${lang}`)
			.then(res => {
				console.log(res.data)
				// @ts-ignore
				setTests(res.data)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [lang])

	const handleSearch = (value: string) => {
		const filteredQuestions =
			tests && tests.filter(question => question.key.includes(value))

		setResults(filteredQuestions)
	}

	return (
		<>
			<section>
				<div className='flex justify-between items-center gap-10'>
					<div>
						<h2 className='text-4xl font-medium'>Тесттер</h2>
					</div>

					<div className='flex items-center space-x-3'>
						{/*
						 //? open search model
					*/}
						<Dialog>
							<DialogTrigger className='outline-none mr-5'>
								<Search color='gray' />
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Іздеу</DialogTitle>
								</DialogHeader>
								<div className='space-y-3'>
									<Input
										placeholder='Іздеу....'
										value={search}
										onChange={event => {
											const value = event.target.value

											setSearch(event.target.value)

											handleSearch(value)
										}}
									/>
								</div>

								<div className='mt-3 space-y-3'>
									{results?.map(res => (
										<div key={res.id}>
											<div className='flex items-center justify-between'>
												<div className=''>
													<span className='text-xs text-gray-500 leading-none block'>
														{res.question}
													</span>
												</div>
												<div>
													<Link href={`/test/${res.id}`}>
														<SquareArrowOutUpRight size={15} />
													</Link>
												</div>
											</div>
										</div>
									))}
								</div>
							</DialogContent>
						</Dialog>

						{/* 
							//? togller for change lang
						*/}
						<ToggleGroup
							type='single'
							size='sm'
							value={lang}
							onValueChange={value => {
								if (value) setLang(value)
							}}
						>
							<ToggleGroupItem value='kk'>KK</ToggleGroupItem>
							<ToggleGroupItem value='ru'>RU</ToggleGroupItem>
						</ToggleGroup>
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

			<section className='mt-10 grid grid-cols-2 gap-3'>
				{tests &&
					tests.map(test => (
						<div key={test.id}>
							<CardTest
								id={test.id}
								keyQuestion={test.key}
								lang={test.lang}
								question={test.question}
							/>
						</div>
					))}
			</section>
		</>
	)
}
