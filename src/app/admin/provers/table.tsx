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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { User } from '@/types/user.types'
import fetchData from '@/utils/api/fetchData'
import { Trash2 } from 'lucide-react'
import DetailProver from './detail'
import UpdateUser from './update'

export default function UsersTable({
	users,
	fetchUsers,
}: {
	users: User[] | undefined
	fetchUsers: () => void
}) {
	return (
		<>
			<Table>
				{/* tableHeader */}
				<TableHeader>
					<TableRow>
						<TableHead>Аты</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Туылған күні</TableHead>
						<TableHead>Телефон номер</TableHead>
						{/* <TableHead>Рөлі</TableHead>
						<TableHead>Облыс</TableHead>
						<TableHead>Аудан / қала</TableHead>
						<TableHead>Округ</TableHead> */}
						<TableHead>Толығырақ</TableHead>
						<TableHead>Әрекет</TableHead>
						<TableHead>Әрекет</TableHead>
					</TableRow>
				</TableHeader>

				{/* tableBody */}
				<TableBody>
					{users?.map(user => (
						<TableRow key={user.id}>
							<TableCell className='font-medium'>{user.name}</TableCell>
							<TableCell className='font-medium'>{user.email}</TableCell>
							<TableCell className='font-medium'>{user.birthday}</TableCell>
							<TableCell className='font-medium'>{user.phone}</TableCell>
							{/* <TableCell className='font-medium'>{user.role[0]}</TableCell>
							<TableCell className='font-medium'>{user.region_name}</TableCell> */}
							{/* <TableCell className='font-medium'>
								{user.district_name}
							</TableCell> */}
							{/* <TableCell className='font-medium'>{user.village_name}</TableCell> */}
							<TableCell>
								<DetailProver
									role={user.role[0]}
									permission={user.permissions[0]}
									region_name={user.region_name}
									district_name={user.district_name}
									village_name={user.village_name}
								/>
							</TableCell>
							<TableCell>
								<UpdateUser fetchUsers={fetchUsers} user={user} />
							</TableCell>
							<TableCell>
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button variant='ghost'>
											<Trash2 size={18} />
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>
												Осы маманды жоюға келісесіз бе?
											</AlertDialogTitle>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Бас тарту</AlertDialogCancel>
											<AlertDialogAction
												className='bg-red-500 hover:bg-red-600'
												onClick={() => {
													fetchData(`users/${user.id}`, 'DELETE').then(res => {
														fetchUsers()
													})
												}}
											>
												Жою
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}
