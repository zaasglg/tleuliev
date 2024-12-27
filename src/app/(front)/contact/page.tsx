'use client'

import Footer from '@/components/app/footer'
import Header from '@/components/app/header'
import { NextPage } from 'next'

interface Props {}

const Contact: NextPage<Props> = ({}) => {
	return (
		<>
			{/* MARK: HEADER */}
			<Header />

			<section className='bg-white'>
				<div className='w-11/12 lg:w-9/12 py-12 mx-auto'>
					<div>
						<p className='font-medium text-blue-500 dark:text-blue-400'>
							Байланыс
						</p>

						<h1 className='mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white'>
							Бізбен байланысу үшін
						</h1>

						<p className='mt-3 text-gray-500 dark:text-gray-400'>
							Біз сіздің пікіріңізді тыңдағымыз келеді. Осы форманы толтырыңыз
							немесе бізге электрондық хат жіберіңіз.
						</p>
					</div>

					<div className='grid grid-cols-1 gap-12 mt-10 lg:grid-cols-2'>
						<div className='grid grid-cols-1 gap-12 md:grid-cols-2'>
							<div>
								<span className='inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										stroke-width='1.5'
										stroke='currentColor'
										className='w-5 h-5'
									>
										<path
											stroke-linecap='round'
											stroke-linejoin='round'
											d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
										/>
									</svg>
								</span>

								<h2 className='mt-4 text-base font-medium text-gray-800 dark:text-white'>
									Email
								</h2>
								<p className='mt-2 text-sm text-blue-500 dark:text-blue-400'>
									info@tleuliev.kz
								</p>
							</div>

							<div>
								<span className='inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										stroke-width='1.5'
										stroke='currentColor'
										className='w-5 h-5'
									>
										<path
											stroke-linecap='round'
											stroke-linejoin='round'
											d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
										/>
										<path
											stroke-linecap='round'
											stroke-linejoin='round'
											d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
										/>
									</svg>
								</span>

								<h2 className='mt-4 text-base font-medium text-gray-800 dark:text-white'>
									Мекен жайы
								</h2>

								<p className='mt-2 text-sm text-blue-500 dark:text-blue-400'>
									Шымкент қаласы
								</p>
							</div>
						</div>

						<div className='p-4 py-6 rounded-lg bg-gray-50 dark:bg-gray-800 md:p-8'>
							<form>
								<div className='-mx-2 md:items-center md:flex'>
									<div className='flex-1 px-2'>
										<label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>
											Аты
										</label>
										<input
											type='text'
											placeholder='Нұрәділет'
											className='block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
										/>
									</div>

									<div className='flex-1 px-2 mt-4 md:mt-0'>
										<label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>
											Тегі
										</label>
										<input
											type='text'
											placeholder='Назаров'
											className='block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
										/>
									</div>
								</div>

								<div className='mt-4'>
									<label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>
										Email
									</label>
									<input
										type='email'
										placeholder='nurad@example.com'
										className='block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
									/>
								</div>

								<div className='w-full mt-4'>
									<label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>
										Хат
									</label>
									<textarea
										className='block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg md:h-56 dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
										placeholder='Хат'
									></textarea>
								</div>

								<button className='w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'>
									Жіберу
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</>
	)
}

export default Contact
