'use client'

import LayoutsApp from '@/app/(dashboard)/layouts-app'
import { BreadcrumbsCustom } from '@/components/breadcrumbs-custom'
import { useRouter } from 'next/navigation'
import {useEffect, useState} from 'react'

export default function Home() {
	const [page, setPage] = useState()
	const router = useRouter()

	return (
		<LayoutsApp>
			<section>
				<div>
					<h2 className='text-4xl font-medium'>Басты бет</h2>
				</div>

				{/* breadcrums */}
				<BreadcrumbsCustom items={[]} />

			</section>
		</LayoutsApp>
	)
}
