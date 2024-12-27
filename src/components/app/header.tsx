import { User } from '@/types/user.types'
import fetchData from '@/utils/api/fetchData'
import { API_ENDPOINTS } from '@/utils/endpoint'
import { UserRound } from 'lucide-react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { ToastAction } from '../ui/toast'
import { logout } from '@/utils/api/logout'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import MobileMenu from './mobile-menu'

const NavLink = ({ href, children, onClick }: { href?: string; children: React.ReactNode; onClick?: () => void }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-xs text-black relative after:content-[''] after:block after:w-0 after:h-[3px] hover:font-bold after:bg-blue-800 after:mx-auto after:transition-all after:duration-300 after:ease-in-out after:rounded-none hover:after:w-1/2"
  >
    {children}
  </a>
);


const Header: NextPage = ({}) => {
	const [userData, setUserData] = useState<User | null>()
	const { toast } = useToast();
  const router = useRouter();
	
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
		<header className='bg-gray-50 py-8'>
			<nav className='w-10/12 lg:w-9/12 mx-auto flex items-center justify-between'>
				<div>
					<span className='font-extrabold text-black text-sm lg:text-xl'>
						Tleuliev VetTest
					</span>
				</div>

        <div className='block lg:hidden'>
          <MobileMenu />
        </div>

				<div className='items-center space-x-3 hidden lg:flex'>
				  <NavLink href="/">БАСТЫ БЕТ</NavLink>
          <NavLink href="/about">БІЗ ЖАЙЛЫ</NavLink>
          {userData ? (
            userData.role?.[0] === 'user' ? (
              <NavLink href="/test">ТЕСТ ТАПСЫРУ</NavLink>
            ) : (
              <NavLink onClick={handleUnauthorizedAccess}>ТЕСТ ТАПСЫРУ</NavLink>
            )
          ) : (
            <NavLink href="/test">ТЕСТ ТАПСЫРУ</NavLink>
          )}
					{userData ? (
            userData.role?.[0] === 'viewer_only' ? (
              <NavLink href="/statistics/region">СТАТИСТИКА</NavLink>
            ) : (
              <NavLink onClick={handleUnauthorizedAccess}>СТАТИСТИКА</NavLink>
            )
          ) : (
            <NavLink href="/statistics/region">СТАТИСТИКА</NavLink>
          )}
					{userData ? (
            userData.role?.[0] === 'district_admin' ? (
              <NavLink href="/redactor/users">МАМАНДАРДЫ БАСҚАРУ</NavLink>
            ) : (
              <NavLink onClick={handleUnauthorizedAccess}>МАМАНДАРДЫ БАСҚАРУ</NavLink>
            )
          ) : (
            <NavLink href="/redactor/users">МАМАНДАРДЫ БАСҚАРУ</NavLink>
          )}
          <NavLink href="/contact">БАЙЛАНЫС</NavLink>
				</div>
				
				{
					userData ? 
					<div className='hidden lg:block'>
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

