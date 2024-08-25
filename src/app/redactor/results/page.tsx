import { BreadcrumbsCustom } from '@/components/breadcrumbs-custom'
import { NextPage } from 'next'

interface Props {}

const Page: NextPage<Props> = ({}) => {
	return (
		<>
			<section>
				<div className='flex justify-between items-center gap-10'>
					<div>
						<h2 className='text-4xl font-medium'>Статистика</h2>
					</div>

					<div></div>
				</div>

				{/*breadcrumb*/}
				<BreadcrumbsCustom items={['Статистика']} />
			</section>
		</>
	)
}

export default Page
