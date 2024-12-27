'use client'

import { useEffect, useState } from 'react'

import Loading from '@/app/profile/loading'
import { BreadcrumbsCustom } from '@/components/breadcrumbs-custom'
import { User } from '@/types/user.types'
import fetchData from '@/utils/api/fetchData'
import CreateUserModal from './modal'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import DetailProver from './detail'
import UpdateUser from './update'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

export default function Page() {
	const [users, setUsers] = useState<User[]>()
	const [loading, setLoading] = useState(true)

	const [formData, setFormData] = useState({
		name: '',
		districtId: 0,
	})

	const fetchUsers = () => {
		fetchData('admin/users/district_admin').then(res => {
			console.log(res)
			setUsers(res.data)
			setLoading(false)
		})
		
	}

	useEffect(() => {
		fetchUsers()
	}, [])

	return (
		<>
			<section>
				<div className='flex justify-between items-center gap-10'>
					<div>
						<h2 className='text-lg lg:text-4xl font-bold'>Аудандық админдер</h2>
					</div>

					<div className='flex items-center space-x-3'>
						<CreateUserModal fetchUsers={fetchUsers} />
					</div>
				</div>

				{/*breadcrumb*/}
				<BreadcrumbsCustom items={['Админ', 'Аудандық админдер']} />
			</section>
			{loading && <Loading />}
			<section className='mt-10'>
			<Table>
        {/* tableHeader */}
        <TableHeader>
          <TableRow>
            <TableHead>Аты</TableHead>
            <TableHead>Телефон номер</TableHead>
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
              <TableCell className='font-medium'>{user.phone}</TableCell>
              <TableCell>
                <DetailProver
                  role={user.role[0]}
                  region_name={user.region_name ?? ""}
                  district_name={user.district_name ?? ""}
                  village_name={user.village_name ?? ""}
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
			</section>
		</>
	)
}
