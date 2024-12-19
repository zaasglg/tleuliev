import { User } from '@/types/user.types'
import fetchData from '@/utils/api/fetchData'
import { API_ENDPOINTS } from '@/utils/endpoint'
import { UserRound } from 'lucide-react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Props {}

const Header: NextPage<Props> = ({}) => {
	const [userData, setUserData] = useState<User | null>()

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
						href='/redactor/reports'
						className="text-xs text-black relative after:content-[''] after:block after:w-0 after:h-[3px] hover:font-bold after:bg-blue-800 after:mx-auto after:transition-all after:duration-300 after:ease-in-out after:rounded-none hover:after:w-1/2"
					>
						СТАТИСТИКА
					</a>
					<a
						href='/admin/users'
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
				
				{
					userData ? 
					<div>
						<Link
							href='/profile'
							className='flex items-center space-x-4 border border-gray-300 rounded py-2 px-5'
						>
							<UserRound size={15} />
							<span className='text-sm'>Жеке кабинет</span>
						</Link>
					</div>
					: null
				}
			</nav>
		</header>
	)
}

export default Header
function setLoading(arg0: boolean) {
	throw new Error('Function not implemented.')
}

