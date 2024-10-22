'use client'

import { useEffect, useState } from 'react'

import Loading from '@/app/profile/loading'
import { BreadcrumbsCustom } from '@/components/breadcrumbs-custom'
import { Input } from '@/components/ui/input'
import { Test } from '@/types/test.types'
import fetchData from '@/utils/api/fetchData'
import { API_ENDPOINTS } from '@/utils/endpoint'
import CardTest from './card-test'

export default function Page() {
	const [tests, setTests] = useState<Test[]>()
	const [filteredTests, setFilteredTests] = useState<Test[]>([])
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState('')

	const fetchTests = () =>
		fetchData(API_ENDPOINTS.userTests)
			.then(res => {
				// @ts-ignore
				setTests(res.data)
				setFilteredTests(res.data)
			})
			.finally(() => {
				setLoading(false)
			})

	useEffect(() => {
		fetchTests()
	}, [])

	// const handleSearch = (value: string) => {
	// 	if (!value) {
	// 		setFilteredTests(tests || [])
	// 	} else {
	// 		const result = fuse.search(value).map(({ item }) => item)
	// 		console.log(tests)
	// 		setFilteredTests(result)
	// 	}

	// }

	const handleSearch = (value: string) => {
		fetchData(API_ENDPOINTS.seachTest(value))
			.then(res => {
				if (!value) {
					setFilteredTests(tests || [])
				} else {
					setFilteredTests(res.data)
				}
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return (
		<>
			<section>
				<div className='flex flex-wrap justify-between items-center gap-3 lg:gap-10 mb-5 lg:mb-0'>
					<div>
						<h2 className='text-lg lg:text-4xl font-bold'>Тесттер</h2>
					</div>

					<div className='flex items-center space-x-3 w-[500px]'>
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
				</div>

				{/*breadcrumb*/}
				<BreadcrumbsCustom items={['Тесттер']} />
			</section>

			{loading && <Loading />}

			<section className='mt-10 grid grid-cols-1 lg:grid-cols-2 gap-3'>
				{filteredTests &&
					filteredTests.map(test => (
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
