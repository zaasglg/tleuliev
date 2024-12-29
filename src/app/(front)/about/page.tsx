'use client'

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

			<section className='px-4 py-16 mx-auto w-11/12 lg:w-9/12'>
				<div className='lg:max-w-xl mb-10 md:mx-auto sm:text-center'>
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
						&quot;Tleuliev VetTest &quot; Ветеринарлық медицина бойынша тест
						сұрақтары жергілікті атқаршуы органдармен құрылған мемлекеттік
						ветеринариялық ұйымдарда біліктілікті арттыруды тікелей ұйымда
						ұйымдастыру процесінде қолдануға арналған.
					</p>
				</div>
				<div className='mb-8'>
					<div className='relative mt-10'>
						<img src='/video.png' alt='' className='rounded-lg h-[250px] lg:h-[500px]' />
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

			</section>

			<Footer />
		</>
	)
}

export default About
