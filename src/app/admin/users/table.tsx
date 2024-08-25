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
						<TableHead>Облыс</TableHead>
						<TableHead>Аудан / қала</TableHead>
						<TableHead>Округ</TableHead>
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
							<TableCell className='font-medium'>{user.region_name}</TableCell>
							<TableCell className='font-medium'>
								{user.district_name}
							</TableCell>
							<TableCell className='font-medium'>{user.village_name}</TableCell>
							<TableCell>
								<UpdateUser fetchUsers={fetchUsers} user={user} />
							</TableCell>
							<TableCell>
								<Button
									variant='ghost'
									onClick={() => {
										fetchData(`users/${user.id}`, 'DELETE').then(res => {
											fetchUsers()
										})
									}}
								>
									<Trash2 size={18} />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}
