import { BreadcrumbsCustom } from '@/components/breadcrumbs-custom'
import { NextPage } from 'next'

interface Props {}

const Instruction: NextPage<Props> = ({}) => {
	return <>
			<section>
				<div>
					<h2 className='text-lg lg:text-4xl font-bold'>Жеке кабинет</h2>
				</div>

				{/*breadcrumb*/}
				<BreadcrumbsCustom items={['Нұсқаулық']} />
			</section>
	</>
}

export default Instruction