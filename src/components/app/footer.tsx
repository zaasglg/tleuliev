import { ChevronRight, Mail, Phone } from 'lucide-react'
import { NextPage } from 'next'

interface Props {}

const Footer: NextPage<Props> = ({}) => {
	return (
		<footer className='bg-gray-900 py-12'>
			<div className='w-11/12 lg:w-9/12 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10'>
				<div>
					<span className='text-white text-2xl font-bold'>
						Tleuliev VetTest
					</span>
					<p className='text-white text-sm mt-5 font-thin'>
						ВЕТЕРИНАРЛЫҚ МЕДИЦИНА бойынша тест сұрақтары
					</p>
				</div>
				<div>
					<h3 className='text-white text-2xl font-bold'>Меню</h3>
					<ul className='mt-5 space-y-2 ml-1'>
						<li>
							<a href='#' className=' text-white flex space-x-1'>
								<ChevronRight size={15} />
								<span className='text-xs font-thin block'>БАСТЫ БЕТ</span>
							</a>
						</li>
						<li>
							<a href='#' className=' text-white flex space-x-1'>
								<ChevronRight size={15} />
								<span className='text-xs font-thin block'>БІЗ ЖАЙЛЫ</span>
							</a>
						</li>
						<li>
							<a href='#' className=' text-white flex space-x-1'>
								<ChevronRight size={15} />
								<span className='text-xs font-thin block'>ТЕСТ ТАПСЫРУ</span>
							</a>
						</li>
						<li>
							<a href='#' className=' text-white flex space-x-1'>
								<ChevronRight size={15} />
								<span className='text-xs font-thin block'>СТАТИСТИКА</span>
							</a>
						</li>

						<li>
							<a href='#' className=' text-white flex space-x-1'>
								<ChevronRight size={15} />
								<span className='text-xs font-thin block'>
									МАМАНДАРДЫ БАСҚАРУ
								</span>
							</a>
						</li>
						<li>
							<a href='#' className='text-white flex space-x-1'>
								<ChevronRight size={15} />
								<span className='text-xs font-thin block'>БАЙЛАНЫС</span>
							</a>
						</li>
					</ul>
				</div>
				<div>
					<h3 className='text-white text-2xl font-bold'>Байланыс телефоны</h3>
					<ul className='mt-5 space-y-4 ml-1'>
						<li>
							<a href='#' className='text-white flex space-x-3'>
								<Phone size={17} />
								<span className='text-sm block'>+7 777 364 3421</span>
							</a>
						</li>
						<li>
							<a href='#' className='text-white flex space-x-3'>
								<Mail size={17} />
								<span className='text-sm block'>n4msin@mail.ru</span>
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div className='w-9/12 mx-auto border-t border-opacity-25 border-gray-50 mt-10 pt-5'>
				<span className='text-white text-center text-sm font-thin'>
					@copiright 2025. Tleuliev VetTest Барлық құқықтар қорғалған
				</span>
			</div>
		</footer>
	)
}

export default Footer
