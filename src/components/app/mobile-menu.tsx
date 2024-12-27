import { NextPage } from 'next'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Menu, UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import fetchData from '@/utils/api/fetchData'
import { API_ENDPOINTS } from '@/utils/endpoint'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { User } from '@/types/user.types'
import { ToastAction } from '@radix-ui/react-toast'
import { logout } from '@/utils/api/logout'
import Link from 'next/link'

interface Props {}

const NavLink = ({ href, children, onClick }: { href?: string; children: React.ReactNode; onClick?: () => void }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-xs border-b pb-2 text-black relative "
  >
    {children}
  </a>
);

const MobileMenu: NextPage<Props> = ({}) => {

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


	return <Sheet>
	<SheetTrigger asChild>
		<Button variant="ghost">
			<Menu />
		</Button>
	</SheetTrigger>
	<SheetContent>
		<SheetHeader>
			<SheetTitle className='text-left'>Tleuliev VetTest</SheetTitle>
			<SheetDescription className='text-left lowercase'>
				ВЕТЕРИНАРЛЫҚ МЕДИЦИНА бойынша тест сұрақтары
			</SheetDescription>
		</SheetHeader>
		<div className="grid gap-4 py-4">
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
            userData.role?.[0] === 'viewer_only' ? (
              <NavLink href="/redactor/users">МАМАНДАРДЫ БАСҚАРУ</NavLink>
            ) : (
              <NavLink onClick={handleUnauthorizedAccess}>МАМАНДАРДЫ БАСҚАРУ</NavLink>
            )
          ) : (
            <NavLink href="/redactor/users">МАМАНДАРДЫ БАСҚАРУ</NavLink>
          )}
          <NavLink href="/contact">БАЙЛАНЫС</NavLink>
		</div>
		<SheetFooter>
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
		</SheetFooter>
	</SheetContent>
</Sheet>
}

export default MobileMenu