'use client'

import Aside from '@/app/(dashboard)/aside'
import DashboardHeader from '@/components/app/dashboard-header'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { ReactNode, useState } from 'react'
import NavLinks from './nav-links'

export default function LayoutsApp({
	children,
}: Readonly<{ children: ReactNode }>) {
	const [menu, setMenu] = useState(false)

	return (
		<>
			<DashboardHeader />
			<div className='flex h-screen flex-col md:flex-row md:overflow-hidden pt-[93px]'>
				<div
					className={clsx(
						'w-full lg:w-64 flex-none fixed lg:relative bg-white lg:bg-transparent z-10',
						{
							'!z-auto !relative': menu,
						}
					)}
				>
					<Aside menu={menu} setMenu={setMenu} />
				</div>
				<div className='mt-60 lg:mt-0 flex-grow p-6 md:overflow-y-auto md:p-12 bg-gray-50'>
					{children}
				</div>
			</div>

			<div
				className={clsx(
					'fixed top-0 flex-col flex justify-center left-0 w-full h-full ',
					{
						hidden: menu === false,
					}
				)}
			>
				<div className='z-20 relative'>
					<div className='w-full text-center'>
						<Button
							variant='ghost'
							onClick={() => {
								setMenu(false)
							}}
							className='text-gray-300 text-sm font-bold text-center  hover:bg-transparent hover:text-white'
						>
							Закрыть
						</Button>
					</div>
					<div className='m-10 p-3 rounded-lg bg-white space-y-2 lg:space-y-0'>
						<NavLinks />
					</div>
				</div>

				<div
					className='bg-black bg-opacity-80 fixed top-0 left-0 w-full h-full'
					onClick={() => {
						setMenu(false)
					}}
				></div>
			</div>
		</>
	)
}
