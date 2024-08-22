'use client'

import CardTest from '@/app/test/card-test'
import { useEffect, useState } from 'react'

import Loading from '@/app/profile/loading'
import { BreadcrumbsCustom } from '@/components/breadcrumbs-custom'
import { Input } from '@/components/ui/input'
import { Test } from '@/types/test.types'
import fetchData from '@/utils/api/fetchData'

export default function Page() {
	const [tests, setTests] = useState<Test[]>()
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState('')

	const fetchTests = () =>
		fetchData(`user/tests`)
			.then(res => {
				console.log(res.data)
				// @ts-ignore
				setTests(res.data)
			})
			.finally(() => {
				setLoading(false)
			})

	useEffect(() => {
		fetchTests()
	}, [])

	useEffect(() => {
		if (search === '') {
			fetchTests()
		} else {
			handleSearch(search)
		}
	}, [search, tests])

	const handleSearch = (value: string) => {
		const filteredTests = tests?.filter(
			test =>
				test.question.toLowerCase().includes(value.toLowerCase()) ||
				test.key.toLowerCase().includes(value.toLowerCase())
		)
		setTests(filteredTests)
	}

	return (
		<>
			<section>
				<div className='flex justify-between items-center gap-10'>
					<div>
						<h2 className='text-4xl font-medium'>Тесттер</h2>
					</div>

					<div className='flex items-center space-x-3 w-[500px]'>
						<Input
							placeholder='Іздеу....'
							value={search}
							onChange={event => {
								const value = event.target.value

								setSearch(event.target.value)

								if (value === '') {
									fetchTests()
								} else {
									handleSearch(value)
								}
							}}
						/>
					</div>
				</div>

				{/*breadcrumb*/}
				<BreadcrumbsCustom items={['Тесттер']} />
			</section>

			{loading && <Loading />}

			<section className='mt-10 grid grid-cols-2 gap-3'>
				{tests &&
					tests.map(test => (
						<div key={test.id}>
							<CardTest
								id={test.id}
								keyQuestion={test.key}
								question={test.question}
								question_ru={test.question_ru}
							/>
						</div>
					))}
			</section>
		</>
	)
}
