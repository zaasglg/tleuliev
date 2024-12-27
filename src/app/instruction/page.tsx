import { BreadcrumbsCustom } from '@/components/breadcrumbs-custom'
import { NextPage } from 'next'

interface Props {}

const Instruction: NextPage<Props> = ({}) => {
	return <>
			<section>
				<div>
					<h2 className='text-lg lg:text-4xl font-bold'>Нұсқаулық</h2>
				</div>

				{/*breadcrumb*/}
				<BreadcrumbsCustom items={['Нұсқаулық']} />
			</section>

			<section className='mt-10'>
				<iframe width="100%" height="500" src="https://www.youtube.com/embed/W_DOraGNyW8?si=uDgi_YFfyiGDgHMk" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
			</section>
	</>
}

export default Instruction