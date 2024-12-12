import { NextPage } from 'next'
import Link from 'next/link'

interface Props {}

const Header: NextPage<Props> = ({}) => {
	return (
		<header className='bg-gray-50 py-8'>
			<nav className='w-9/12 mx-auto flex items-center justify-between'>
				<div>
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
						href='/about'
						className="text-xs text-black relative after:content-[''] after:block after:w-0 after:h-[3px] hover:font-bold after:bg-blue-800 after:mx-auto after:transition-all after:duration-300 after:ease-in-out after:rounded-none hover:after:w-1/2"
					>
						БІЗ ЖАЙЛЫ
					</a>
					<Link
						href='/test'
						className="text-xs text-black relative after:content-[''] after:block after:w-0 after:h-[3px] hover:font-bold after:bg-blue-800 after:mx-auto after:transition-all after:duration-300 after:ease-in-out after:rounded-none hover:after:w-1/2"
					>
						ТЕСТ ТАПСЫРУ
					</Link>
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
					<Link
						href='/contact'
						className="text-xs text-black relative after:content-[''] after:block after:w-0 after:h-[3px] hover:font-bold after:bg-blue-800 after:mx-auto after:transition-all after:duration-300 after:ease-in-out after:rounded-none hover:after:w-1/2"
					>
						БАЙЛАНЫС
					</Link>
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

export default Header
