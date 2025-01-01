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
	

	// MARK: MENU District admin
	const links: NavLink[] = useMemo(
		() => [
			{ name: 'Жылдық жоспар', href: '/redactor/reports', icon: <ClipboardCheck />, },
			{ name: 'Мамандар тізімі', href: '/redactor/users', icon: <ListTodo />, },
			{ name: 'Статистика', href: '/redactor/statistics/district', icon: <ListTodo />, },
			{ name: 'Нұсқаулық', href: '/instruction', icon: <ListTodo />, },
		],
		[userData]
	)

	// MARK: MENU Viewer
	const linksViewer: NavLink[] = useMemo(
		() => [
			{ name: 'Статистика', href: '/statistics/region', icon: <TvMinimal /> },
			{ name: 'Нұсқаулық', href: '/instruction', icon: <ChartBar /> },
		],
		[]
	)

		// MARK: MENU Viewer All
		const linksViewerAll: NavLink[] = useMemo(
			() => [
				{ name: 'Статистика', href: '/statistics/country', icon: <TvMinimal /> },
				{ name: 'Нұсқаулық', href: '/instruction', icon: <ChartBar /> },
			],
			[]
		)

	// MARK: MENU Admin
	const linksAdmin: NavLink[] = useMemo(
		() => [
			{ name: 'Басты бет', href: '/', icon: <TvMinimal size={size} /> },
			{ name: 'Жеке кабинет', href: '/profile', icon: <Contact size={size} /> },
			{ name: 'Тест', href: '/admin/test', icon: <ListTodo size={size} /> },
			{ name: 'Облыстар', href: '/admin/regions', icon: <ListTodo size={size} />, },
			{ name: 'Аудан қалалар', href: '/admin/districts', icon: <ListTodo size={size} />, },
			{ name: 'Округтар', href: '/admin/villages', icon: <ListTodo size={size} />, },
			{ name: 'Мамандар', href: '/admin/users', icon: <ListTodo size={size} />, },
			{ name: 'Аудандық админдер', href: '/admin/provers', icon: <ListTodo size={size} />, },
			{ name: 'Статистика админдер', href: '/admin/statistics', icon: <ListTodo size={size} />, },
		],
		[]
	)

	// MARK: MENU User
	const linksUser: NavLink[] = useMemo(
		() => [
			{ name: 'Тест тапсыру', href: '/test', icon: <ListTodo size={size} /> },
			{ name: 'Жылдық жоспар', href: '/result', icon: <ChartBar size={size} /> },
			{ name: 'Нұсқаулық', href: '/instruction', icon: <Contact size={size} /> },
			{ name: 'Жеке кабинет', href: '/profile', icon: <Contact size={size} /> },
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
					district_admin: renderLinks(links),
					viewer_only: renderLinks(linksViewer),
					viewer_only_all: renderLinks(linksViewerAll),
					admin: renderLinks(linksAdmin),
					user: renderLinks(linksUser),
				}[userData.role[0]]
			}
		</>
	)
}
