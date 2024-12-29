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
import fetchData from '@/utils/api/fetchData'
import { API_ENDPOINTS } from '@/utils/endpoint'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { logout } from '@/utils/api/logout'
import { User } from '@/types/user.types'

export default function Home() {
	const [userData, setUserData] = useState<User | null>()
	const [page, setPage] = useState()
	const router = useRouter()
	const { toast } = useToast();

	useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true,
    });
  }, [])

		useEffect(() => {
			fetchData(API_ENDPOINTS.user)
				.then(res => {
					if (res.status === 200) {
						setUserData(res.data)
					}
				})
				.catch(error => {
					console.error('Failed to fetch user data:', error)
				})
		}, [])

		const handleUnauthorizedAccess = () => {
			toast({
				title: 'Сіздің бұл мәзірге рұқсатыңыз жоқ',
				description: 'Өзіңіздің жеке кабинетіңізден шығып қайтадан кіріп көруіңізді сұраймыз',
				action: (
					<ToastAction
						onClick={() => {
							logout();
							router.push('/login');
						}}
						altText="Logout"
					>
						Аккаунттан шығу
					</ToastAction>
				),
			});
		};


	return (
		<>
			{/* MARK: HEADER */}
			<Header />

			{/* MARK: WELCOME */}
			<section className='bg-blue-800'>
				<div className='grid items-center grid-cols-1 lg:grid-cols-2 gap-10 w-11/12 lg:w-9/12 mx-auto py-12'>
					<div className='space-y-5' data-aos="zoom-out">
						<h2 className='text-white font-bold' >TLEULIEV VetTest</h2>
						<span className='text-white block text-2xl lg:text-4xl uppercase font-extrabold'>
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
				<div className='w-11/12 lg:w-9/12 mx-auto py-12 grid grid-cols-1 lg:grid-cols-3 gap-5'>
					{/* ======================================== */}
					<div className='shadow bg-white rounded-md' data-aos="fade-up">
						<img
							src='/images/for_test_pass.jpg'
							alt=''
							className='h-[200px] w-full object-cover rounded-t-md'
							data-aos="flip-up"
						/>
						<div className='bg-white p-5 rounded-b-md'>
							<h2 className='text-left font-bold'>
								Тест тапсырушы жүйесіне кіру
							</h2>
							<p className='text-left font-thin text-sm'>
								Берілген логин және құпиясөз арқылы жүйеге кіріңіз
							</p>

							{userData ? (
								userData.role?.[0] === 'user' ? (
									<Button className='mt-5 w-full transition duration-150 hover:-translate-y-2 hover:bg-blue-800 hover:text-white' variant='secondary' asChild>
										<Link href='/test'>
											Кіру
										</Link>
									</Button>
								) : (
									<Button onClick={handleUnauthorizedAccess} className='mt-5 w-full transition duration-150 hover:-translate-y-2 hover:bg-blue-800 hover:text-white' variant='secondary'>
											Кіру
									</Button>
								)
							) : (
								<Button className='mt-5 w-full transition duration-150 hover:-translate-y-2 hover:bg-blue-800 hover:text-white' variant='secondary' asChild>
									<Link href='/test'>
										Кіру
									</Link>
								</Button>
							)}

						</div>
					</div>

					{/* ======================================== */}
					<div className='shadow bg-white rounded-md' data-aos="fade-up">
						<img
							src='/images/for_statistics.png'
							alt=''
							className='h-[200px] w-full object-cover rounded-t-md'
							data-aos="flip-up"
						/>
						<div className='bg-white p-5 rounded-b-md'>
							<h2 className='text-left font-bold'>Статистика жүйесіне кіру</h2>
							<p className='text-left font-thin text-sm'>
								Берілген логин және құпиясөз арқылы жүйеге кіріңіз
							</p>

							{userData ? (
								userData.role?.[0] === 'viewer_only' ? (
									<Button className='mt-5 w-full transition duration-150 hover:-translate-y-2 hover:bg-blue-800 hover:text-white' variant='secondary' asChild>
										<Link href='/statistics/region'>
											Кіру
										</Link>
									</Button>
								) : (
									<Button onClick={handleUnauthorizedAccess} className='mt-5 w-full transition duration-150 hover:-translate-y-2 hover:bg-blue-800 hover:text-white' variant='secondary'>
											Кіру
									</Button>
								)
							) : (
								<Button className='mt-5 w-full transition duration-150 hover:-translate-y-2 hover:bg-blue-800 hover:text-white' variant='secondary' asChild>
									<Link href='/statistics/region'>
										Кіру
									</Link>
								</Button>
							)}
						</div>
					</div>

					{/* ======================================== */}
					<div className='shadow bg-white rounded-md' data-aos="fade-up">
						<img
							src='/images/for_control_users.jpeg'
							alt=''
							className='h-[200px] w-full object-cover rounded-t-md'
							data-aos="flip-up"
						/>
						<div className='bg-white p-5 rounded-b-md'>
							<h2 className='text-left font-bold'>Мамандарды басқару жүйесіне кіру</h2>
							<p className='text-left font-thin text-sm'>
								Берілген логин және құпиясөз арқылы жүйеге кіріңіз
							</p>

							{userData ? (
								userData.role?.[0] === 'district_admin' ? (
									<Button className='mt-5 w-full transition duration-150 hover:-translate-y-2 hover:bg-blue-800 hover:text-white' variant='secondary' asChild>
										<Link href='/redactor/users'>
											Кіру
										</Link>
									</Button>
								) : (
									<Button onClick={handleUnauthorizedAccess} className='mt-5 w-full transition duration-150 hover:-translate-y-2 hover:bg-blue-800 hover:text-white' variant='secondary'>
											Кіру
									</Button>
								)
							) : (
								<Button className='mt-5 w-full transition duration-150 hover:-translate-y-2 hover:bg-blue-800 hover:text-white' variant='secondary' asChild>
									<Link href='/redactor/users'>
										Кіру
									</Link>
								</Button>
							)}
						</div>
					</div>

				</div>
			</section>

			{/* MARK: VIDEO */}
			<section className='py-12'>
				<div className='w-11/12 lg:w-9/12 mx-auto'>
					<h2 className='text-center text-2xl lg:text-3xl font-bold uppercase'>
						Платформаны қолдану жайлы видеонұсқаулық
					</h2>
					<div className='relative mt-10' data-aos="zoom-in">
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

			{/* MARK: STATISTICS */}
			<Statistic />

			{/* MARK: FOOTER */}
			<Footer />
		</>
	)
}
