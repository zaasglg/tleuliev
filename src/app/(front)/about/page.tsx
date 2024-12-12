import Footer from '@/components/app/footer'
import Header from '@/components/app/header'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import { NextPage } from 'next'

interface Props {}

const About: NextPage<Props> = ({}) => {
	return (
		<>
			{/* MARK: HEADER */}
			<Header />

			<section className='px-4 py-16 mx-auto w-9/12'>
				<div className='max-w-xl mb-10 md:mx-auto sm:text-center'>
					<div>
						<p className='inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400'>
							TLEULIEV VetTest
						</p>
					</div>
					<h2 className='uppercase text-blue-800 mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto'>
						<span className='relative inline-block'>
							<svg
								viewBox='0 0 52 24'
								fill='currentColor'
								className='absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block'
							>
								<defs>
									<pattern
										id='9a29985a-fc16-419b-ae53-1670f5ca4491'
										x='0'
										y='0'
										width='.135'
										height='.30'
									>
										<circle cx='1' cy='1' r='.7' />
									</pattern>
								</defs>
								<rect
									fill='url(#9a29985a-fc16-419b-ae53-1670f5ca4491)'
									width='52'
									height='24'
								/>
							</svg>
							<span className='relative'>ВЕТЕРИНАРЛЫҚ</span>
						</span>{' '}
						МЕДИЦИНА бойынша тест сұрақтары
					</h2>
					<p className='text-base text-gray-700 md:text-lg'>
						"Tleuliev VetTest" Ветеринарлық медицина бойынша тест сұрақтары
						жергілікті атқаршуы органдармен құрылған мемлекеттік ветеринариялық
						ұйымдарда біліктілікті арттыруды тікелей ұйымда ұйымдастыру
						процесінде қолдануға арналған.
					</p>
				</div>
				<div className='mb-8'>
					<div className='relative mt-10'>
						<img src='/video.png' alt='' className='rounded-lg h-[500px]' />
						<div className='absolute w-full bg-black bg-opacity-70 h-full top-0 left-0 rounded-lg flex items-center justify-center'>
							<Button
								variant='ghost'
								className='hover:bg-grat-50 bg-gray-50 transition bg-opacity-20 hover:bg-opacity-30 w-[80px] h-[80px] rounded-full hover:scale-110'
							>
								<Play color='white' size={50} />
							</Button>
						</div>
					</div>
				</div>
				<div className='flex items-center sm:justify-center'>
					<a
						href='#_'
						className='box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none'
					>
						<span className='absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0'></span>
						<span className='absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0'></span>
						<span className='relative z-20 flex items-center text-sm'>
							<svg
								className='relative w-5 h-5 mr-2 text-white'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='M13 10V3L4 14h7v7l9-11h-7z'
								></path>
							</svg>
							Жеке кабинетке кіру
						</span>
					</a>
				</div>
			</section>

			<Footer />
		</>
	)
}

export default About
