'use client'

import Footer from '@/components/app/footer'
import Header from '@/components/app/header'
import Statistic from '@/components/app/statistic'
import { Button } from '@/components/ui/button'
import { WobbleCard } from '@/components/ui/wobble-card'
import { Play } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link'

export default function Home() {
	const [page, setPage] = useState()
	const router = useRouter()

	useEffect(() => {
    AOS.init({
      duration: 1200, // Set animation duration
      once: true, // Whether animation should happen only once
    });
  }, [])

	
	const words = [
    {
      text: "ВЕТЕРИНАРЛЫҚ ",
    },
    {
      text: "МЕДИЦИНА",
    },
    {
      text: "бойынша",
    },
    {
      text: "тест",
    },
    {
      text: "сұрақтары.",
    },
  ];

	return (
		<>
			{/* MARK: HEADER */}
			<Header />

			{/* MARK: WELCOME */}
			<section className='bg-blue-800'>
				<div className='grid items-center grid-cols-2 gap-10 w-9/12 mx-auto py-12'>
					<div className='space-y-5' data-aos="zoom-out">
						<h2 className='text-white font-bold' >TLEULIEV VetTest</h2>
						<span className='text-white block text-4xl uppercase font-extrabold'>
							ВЕТЕРИНАРЛЫҚ МЕДИЦИНА бойынша тест сұрақтары
						</span>
						<p className='text-white font-thin'>
							&quot;Tleuliev VetTest&quot; Ветеринарлық медицина бойынша тест
							сұрақтары жергілікті атқаршуы органдармен құрылған мемлекеттік
							ветеринариялық ұйымдарда біліктілікті арттыруды тікелей ұйымда
							ұйымдастыру процесінде қолдануға арналған.
						</p>
					</div>

					<div className='w-full h-full flex justify-end'>
						<img src='/images/statistics.png' alt='Statistic Image' data-aos="zoom-out" />
					</div>
				</div>
			</section>

			{/* MARK: BLOCKS */}
			<section className='bg-gray-50'>
				<div className='w-9/12 mx-auto py-12 grid grid-cols-3 gap-5'>
					{/* ======================================== */}
					<div className='shadow bg-white rounded-md'>
						<img
							src='/images/for_test_pass.jpg'
							alt=''
							className='h-[200px] w-full object-cover rounded-t-md'
							data-aos="flip-up"
						/>
						<div className='bg-white p-5 rounded-b-md' data-aos="fade-up">
							<h2 className='text-left font-bold'>
								Тест тапсырушы жүйесіне кіру
							</h2>
							<p className='text-left font-thin text-sm'>
								Берілген логин және құпиясөз арқылы жүйеге кіріңіз
							</p>

							<Button className='mt-5 w-full transition duration-150 hover:-translate-y-2 hover:bg-blue-800 hover:text-white' variant='secondary' asChild>
								<Link href='/test'>
									Кіру
								</Link>
							</Button>
						</div>
					</div>

					{/* ======================================== */}
					<div className='shadow bg-white rounded-md'>
						<img
							src='/images/for_statistics.png'
							alt=''
							className='h-[200px] w-full object-cover rounded-t-md'
							data-aos="flip-up"
						/>
						<div className='bg-white p-5 rounded-b-md' data-aos="fade-up" data-aos-delay="500">
							<h2 className='text-left font-bold'>Статистика жүйесіне кіру</h2>
							<p className='text-left font-thin text-sm'>
								Берілген логин және құпиясөз арқылы жүйеге кіріңіз
							</p>

							<Button asChild className='mt-5 w-full transition duration-150 hover:-translate-y-2 hover:bg-blue-800 hover:text-white' variant={'secondary'}>
								<Link href='/redactor/reports'>
									Кіру
								</Link>
							</Button>
						</div>
					</div>

					{/* ======================================== */}
					<div className='shadow bg-white rounded-md'>
						<img
							src='/images/for_statistics.png'
							alt=''
							className='h-[200px] w-full object-cover rounded-t-md'
							data-aos="flip-up"
						/>
						<div className='bg-white p-5 rounded-b-md' data-aos="fade-up" data-aos-delay="1000">
							<h2 className='text-left font-bold'>Мамандарды басқару жүйесіне кіру</h2>
							<p className='text-left font-thin text-sm'>
								Берілген логин және құпиясөз арқылы жүйеге кіріңіз
							</p>

							<Button className='mt-5 w-full transition duration-150 hover:-translate-y-2 hover:bg-blue-800 hover:text-white' variant='secondary' asChild>
								<Link href='/admin/users'>
									Кіру
								</Link>
							</Button>
						</div>
					</div>


					{/* <div className='p-5 shadow bg-white rounded-md'>
						<h2 className='text-left font-bold'>
							Мамандарды басқару жүйесіне кіру
						</h2>
						<p className='text-left font-thin text-sm'>
							Берілген логин және құпиясөз арқылы жүйеге кіріңіз
						</p>
						<Button className='mt-5 w-full' variant='secondary'>
							Кіру
						</Button>
					</div> */}
				</div>
			</section>

			{/* MARK: VIDEO */}
			<section className='py-12'>
				<div className='w-9/12 mx-auto'>
					<h2 className='text-center text-3xl font-bold uppercase'>
						Платформаны қолдану жайлы видеонұсқаулық
					</h2>
					<div className='relative mt-10' data-aos="zoom-in">
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


			</section>

			{/* MARK: STATISTICS */}
			<Statistic />

			{/* MARK: FOOTER */}
			<Footer />
		</>
	)
}
