'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { User } from '@/types/user.types'
import fetchData from '@/utils/api/fetchData'
import { API_ENDPOINTS } from '@/utils/endpoint'
import { clsx } from 'clsx'
import {
	ChartBar,
	ClipboardCheck,
	Contact,
	Files,
	ListTodo,
	MessageCircle,
	TvMinimal,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

type NavLink = {
	name: string
	href: string
	icon: JSX.Element
}

export default function NavLinks() {
	const pathname = usePathname()
	const [userData, setUserData] = useState<User | null>()
	const [loading, setLoading] = useState(true)

	const size = 13

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
			.finally(() => {
				setLoading(false)
			})
	}, [])
	
	const links: NavLink[] = useMemo(
		() => [
			{ name: 'Басты бет', href: '/', icon: <TvMinimal /> },
			{ name: 'Жеке кабинет', href: '/profile', icon: <Contact /> },
			{
				name: 'Жылдық жоспар',
				href: '/redactor/reports',
				icon: <ClipboardCheck />,
			},
			{
				name: 'Мамандар',
				href: '/redactor/users',
				icon: <ListTodo />,
			},
			...(userData?.permissions[0] === 'region'
				? [
						{
							name: 'Облыс статика',
							href: '/redactor/statistics/region',
							icon: <ChartBar />,
						},
				  ]
				: userData?.permissions[0] === 'district'
				? [
						{
							name: 'Аудан статика',
							href: '/redactor/statistics/district',
							icon: <ChartBar />,
						},
				  ]
				: userData?.permissions[0] === 'village'
				? [
						{
							name: 'Округ статика',
							href: '/redactor/statistics/village',
							icon: <ChartBar />,
						},
				  ]
				: []),
		],
		[userData]
	)

	const linksObserver: NavLink[] = useMemo(
		() => [
			{ name: 'Басты бет', href: '/', icon: <TvMinimal /> },
			{ name: 'Жеке кабинет', href: '/profile', icon: <Contact /> },
			...(userData?.permissions[0] === 'region'
				? [
						{
							name: 'Облыс статика',
							href: '/redactor/statistics/region',
							icon: <ChartBar />,
						},
				  ]
				: userData?.permissions[0] === 'district'
				? [
						{
							name: 'Аудан статика',
							href: '/redactor/statistics/district',
							icon: <ChartBar />,
						},
				  ]
				: userData?.permissions[0] === 'village'
				? [
						{
							name: 'Округ статика',
							href: '/redactor/statistics/village',
							icon: <ChartBar />,
						},
				  ]
				: []),
		],
		[userData]
	)

	const linksAdmin: NavLink[] = useMemo(
		() => [
			{ name: 'Басты бет', href: '/', icon: <TvMinimal size={size} /> },
			{ name: 'Жеке кабинет', href: '/profile', icon: <Contact size={size} /> },
			{ name: 'Тест', href: '/admin/test', icon: <ListTodo size={size} /> },
			{
				name: 'Облыстар',
				href: '/admin/regions',
				icon: <ListTodo size={size} />,
			},
			{
				name: 'Аудан қалалар',
				href: '/admin/districts',
				icon: <ListTodo size={size} />,
			},
			{
				name: 'Округтар',
				href: '/admin/villages',
				icon: <ListTodo size={size} />,
			},
			{
				name: 'Мамандар',
				href: '/admin/users',
				icon: <ListTodo size={size} />,
			},
			{
				name: 'Аудандық админдер',
				href: '/admin/provers',
				icon: <ListTodo size={size} />,
			},
		],
		[]
	)

	const linksUser: NavLink[] = useMemo(
		() => [
			{ name: 'Басты бет', href: '/', icon: <TvMinimal size={size} /> },
			{ name: 'Жеке кабинет', href: '/profile', icon: <Contact size={size} /> },
			{ name: 'Тест', href: '/test', icon: <ListTodo size={size} /> },
			{ name: 'Статистика', href: '/result', icon: <ChartBar size={size} /> },
			{ name: 'Материалдар', href: '/material', icon: <Files size={size} /> },
			{
				name: 'Кері байланыс',
				href: '/feedback',
				icon: <MessageCircle size={size} />,
			},
		],
		[]
	)

	const renderLinks = (linksToRender: NavLink[]) =>
		linksToRender.map((link: NavLink) => (
			<Link
				key={link.name}
				href={link.href}
				className={clsx(
					'flex h-[48px] grow items-center justify-start lg:justify-start gap-2 rounded-lg bg-white p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
					{
						'!bg-blue-500 text-white !hover:bg-transparent !hover:text-white':
							pathname === link.href,
					}
				)}
			>
				<div
					className={clsx('bg-gray-100 p-2 rounded-lg', {
						'!bg-transparent p-0': pathname === link.href,
					})}
				>
					{link.icon}
				</div>
				<p className='block text-xs'>{link.name}</p>
			</Link>
		))

	if (loading) {
		return (
			<>
				{links.map(item => (
					<div
						key={item.href}
						className='animate-pulse flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
					>
						<Skeleton className='w-7 h-7 rounded bg-gray-300' />
						<Skeleton className='w-24 h-2 rounded bg-gray-300' />
					</div>
				))}
			</>
		)
	}

	if (!userData) {
		return null
	}

	return (
		<>
			{
				{
					region_admin: renderLinks(links),
					district_admin: renderLinks(links),
					village_admin: renderLinks(links),
					observer: renderLinks(linksObserver),
					admin: renderLinks(linksAdmin),
					user: renderLinks(linksUser),
				}[userData.role[0]]
			}
		</>
	)
}
