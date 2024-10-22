'use client'

import NavLinks from '@/app/(dashboard)/nav-links'
import Logo from '@/components/Logo'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { logout } from '@/utils/api/logout'
import { MenuIcon, PowerIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Props {
	menu: boolean
	setMenu: (data: boolean) => void
}

export default function Aside({ menu, setMenu }: Props) {
	const router = useRouter()

	return (
		<div className='flex h-full flex-col px-3 py-4 md:px-2'>
			<Link
				className='relative mb-2 flex h-[150px] lg:h-40 items-end justify-start rounded-md bg-blue-600 p-4'
				href='/'
			>
				<div className='w-full lg:w-32 text-white md:w-40'>
					<Logo color='white' size={20} /> <br />
					<span className='text-xs leading-none block mt-1 text-gray-100'>
						Ветеринарлық медицина бойынша теориялық білімді арттыру платформасы
					</span>
				</div>
			</Link>
			<div className='flex grow flex-row justify-start lg:justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
				<div className='block lg:hidden'>
					<Button
						className='flex h-[48px] grow items-center justify-center gap-2 rounded-lg bg-blue-500 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
						onClick={() => {
							setMenu(true)
						}}
					>
						<div className=''>
							<MenuIcon />
						</div>
					</Button>
				</div>
				<div className='hidden lg:block'>
					<NavLinks />
				</div>
				<div className='hidden h-auto w-full grow rounded-md  md:block'></div>
				<form>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<button
								type='button'
								className='flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3'
							>
								<PowerIcon className='w-6' />
								<div className='hidden md:block'>Шығу</div>
							</button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Сіз жүйеден шығуды қалайсыз ба?
								</AlertDialogTitle>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Бас тарту</AlertDialogCancel>
								<AlertDialogAction
									className='bg-red-500 hover:bg-red-600'
									onClick={async () => {
										logout()
										router.push('/login')
									}}
								>
									Растау
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</form>
			</div>
		</div>
	)
}
