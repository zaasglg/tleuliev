import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Fragment } from 'react'

export function BreadcrumbsCustom({ items }: { items: string[] }) {
	return (
		<>
			<Breadcrumb className='mt-1 lg:mt-5'>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink>Басты бет</BreadcrumbLink>
					</BreadcrumbItem>
					{items.map((item, index) => (
						<Fragment key={index}>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>{item}</BreadcrumbPage>
							</BreadcrumbItem>
						</Fragment>
					))}
				</BreadcrumbList>
			</Breadcrumb>
		</>
	)
}
