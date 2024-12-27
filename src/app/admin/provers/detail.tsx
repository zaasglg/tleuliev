import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Eye } from 'lucide-react'
import { useState } from 'react'

export default function DetailProver({
	role,
	region_name,
	district_name,
	village_name,
}: {
	role: string
	region_name: string
	district_name: string
	village_name: string
}) {
	const [modal, setModal] = useState(false)
	return (
		<>
			<Dialog open={modal} onOpenChange={setModal}>
				<DialogTrigger asChild>
					<Button variant='ghost'>
						<Eye size={18} />
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[50%]'>
					<DialogHeader>
						<DialogTitle>Толығырақ</DialogTitle>
					</DialogHeader>
					<div className='grid grid-cols-2 gap-3'>
						{/* name */}

						<div className='border rounded-lg p-3'>
							<h6 className='font-thin text-sm'>Рөлі</h6>
							<span>
								<b>{role}</b>
							</span>
						</div>

						<div className='border rounded-lg p-3'>
							<h6 className='font-thin text-sm'>Облыс</h6>
							<span>
								<b>{region_name}</b>
							</span>
						</div>

						<div className='border rounded-lg p-3'>
							<h6 className='font-thin text-sm'>Аудан</h6>
							<span>
								<b>{district_name}</b>
							</span>
						</div>

						<div className='border rounded-lg p-3'>
							<h6 className='font-thin text-sm'>Округ</h6>
							<span>
								<b>{village_name}</b>
							</span>
						</div>

						{/* birthday */}
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}
