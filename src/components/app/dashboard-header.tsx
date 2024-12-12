import { Menu } from 'lucide-react'
import { NextPage } from 'next'
import Link from 'next/link'
import { Button } from '../ui/button'

interface Props {}

const DashboardHeader: NextPage<Props> = ({}) => {
	return (
		<header className='bg-white py-8 border-b fixed w-full z-[9999]'>
			<nav className='px-5 flex items-center justify-between'>
				<div className='flex items-center space-x-5'>
					<Button variant='ghost' className='p-0 hover:bg-transparent'>
						<Menu />
					</Button>
					<span className='font-extrabold text-black text-xl'>
						Tleuliev VetTest
					</span>
				</div>

				<div className='flex items-center space-x-3'>
					<Link
						href='/'
						className="text-xs text-black relative after:content-[''] after:block after:w-0 after:h-[3px] hover:font-bold after:bg-blue-800 after:mx-auto after:transition-all after:duration-300 after:ease-in-out after:rounded-none hover:after:w-1/2"
					>
						БАСТЫ БЕТ
					</Link>
					<a
						href='#'
						className="text-xs text-black relative after:content-[''] after:block after:w-0 after:h-[3px] hover:font-bold after:bg-blue-800 after:mx-auto after:transition-all after:duration-300 after:ease-in-out after:rounded-none hover:after:w-1/2"
					>
						БІЗ ЖАЙЛЫ
					</a>
					<a
						href='#'
						className="text-xs text-black relative after:content-[''] after:block after:w-0 after:h-[3px] hover:font-bold after:bg-blue-800 after:mx-auto after:transition-all after:duration-300 after:ease-in-out after:rounded-none hover:after:w-1/2"
					>
						ТЕСТ ТАПСЫРУ
					</a>
					<a
						href='#'
						className="text-xs text-black relative after:content-[''] after:block after:w-0 after:h-[3px] hover:font-bold after:bg-blue-800 after:mx-auto after:transition-all after:duration-300 after:ease-in-out after:rounded-none hover:after:w-1/2"
					>
						СТАТИСТИКА
					</a>
					<a
						href='#'
						className="text-xs text-black relative after:content-[''] after:block after:w-0 after:h-[3px] hover:font-bold after:bg-blue-800 after:mx-auto after:transition-all after:duration-300 after:ease-in-out after:rounded-none hover:after:w-1/2"
					>
						МАМАНДАРДЫ БАСҚАРУ
					</a>
					<a
						href='#'
						className="text-xs text-black relative after:content-[''] after:block after:w-0 after:h-[3px] hover:font-bold after:bg-blue-800 after:mx-auto after:transition-all after:duration-300 after:ease-in-out after:rounded-none hover:after:w-1/2"
					>
						БАЙЛАНЫС
					</a>
				</div>
				{/* 
				<div>
					<a
						href='#'
						className='flex items-center space-x-4 border border-gray-300 rounded py-2 px-5'
					>
						<LogIn size={15} />
						<span className='text-sm'>Кіру</span>
					</a>
				</div> */}
			</nav>
		</header>
	)
}

export default DashboardHeader
