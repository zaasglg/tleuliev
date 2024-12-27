import { Districts, Regions, Villages } from '@/types/region.types'
import fetchData from '@/utils/api/fetchData'
import { Filter } from 'lucide-react'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'

interface Props {}

const Statistic: NextPage<Props> = ({}) => {
	const [regions, setRegions] = useState<Regions[] | null>()
	const [districts, setDistricts] = useState<Districts[] | null>()
	const [villages, setVillages] = useState<Villages[] | null>()
	const [regionID, setRegionID] = useState<number | null>()
	const [districtID, setDistrictID] = useState<number | null>()
	const [villageID, setVilalgeID] = useState<number | null>()
	const [active, setActive] = useState<number>(0)

	const [userCount, setUserCount] = useState<number>(0)

	useEffect(() => {
		fetchData('regions').then(res => {
			setRegions(res.data)
		})

		fetchData('districts').then(res => {
			setDistricts(res.data)
		})

		fetchData('villages').then(res => {
			setVillages(res.data)
		})
	}, [])

	const countUserbyRegion = (id: number) => {
		fetchData(`front/stat/region/${id}`).then(res => {
			setUserCount(res.data['user_count'])
		})
	}

	const countUserbyDistrict = (id: number) => {
		fetchData(`front/stat/district/${id}`).then(res => {
			setUserCount(res.data['user_count'])
		})
	}

	const countUserbyVillage = (id: number) => {
		fetchData(`front/stat/village/${id}`).then(res => {
			setUserCount(res.data['user_count'])
		})
	}

	return (
		<section className='bg-blue-800'>
			<div className='w-11/12 lg:w-9/12 mx-auto py-12'>
				<h2 className='text-white font-bold uppercase text-center text-3xl'>
					Тіркелушілер саны:
				</h2>

				<div className='flex flex-wrap justify-center mt-10 space-x-3'>
					<span
						className={
							active == 0
								? 'font-bold border py-3 px-5 text-white uppercase flex items-center space-x-2 cursor-pointer'
								: 'py-3 px-5 text-white uppercase font-thin flex items-center space-x-2 cursor-pointer'
						}
						onClick={() => {
							setActive(0)
						}}
					>
						<Filter />
						<span>Облыс бойынша</span>
					</span>
					<span
						className={
							active == 1
								? 'font-bold border py-3 px-5 text-white uppercase flex items-center space-x-2 cursor-pointer'
								: 'py-3 px-5 text-white uppercase font-thin flex items-center space-x-2 cursor-pointer'
						}
						onClick={() => {
							setActive(1)
						}}
					>
						<Filter />
						<span>Аудан бойынша</span>
					</span>
					<span
						className={
							active == 2
								? 'font-bold border py-3 px-5 text-white uppercase flex items-center space-x-2 cursor-pointer'
								: 'py-3 px-5 text-white uppercase font-thin flex items-center space-x-2 cursor-pointer'
						}
						onClick={() => {
							setActive(2)
						}}
					>
						<Filter />
						<span>Округ бойынша</span>
					</span>
				</div>

				<div className='grid items-center grid-cols-2 gap-10 mt-10'>
					<div className='space-y-1'>
						{active == 0 ? (
							<>
								<Label className='text-white'>Облыс</Label>
								<Select
									onValueChange={val => {
										countUserbyRegion(Number(val))
									}}
								>
									<SelectTrigger className=''>
										<SelectValue placeholder='-----------------' />
									</SelectTrigger>
									<SelectContent>
										{regions &&
											regions.map(region => (
												<SelectItem value={String(region.id)} key={region.id}>
													{region.name}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
							</>
						) : null}
						{active == 1 ? (
							<>
								<Label className='text-white'>Аудан</Label>
								<Select
									onValueChange={val => {
										countUserbyDistrict(Number(val))
									}}
								>
									<SelectTrigger className=''>
										<SelectValue placeholder='-----------------' />
									</SelectTrigger>
									<SelectContent>
										{districts &&
											districts.map(district => (
												<SelectItem
													value={String(district.id)}
													key={district.id}
												>
													{district.name}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
							</>
						) : null}
						{active == 2 ? (
							<>
								<Label className='text-white'>Округ</Label>
								<Select
									onValueChange={val => {
										countUserbyVillage(Number(val))
									}}
								>
									<SelectTrigger className=''>
										<SelectValue placeholder='-----------------' />
									</SelectTrigger>
									<SelectContent>
										{villages &&
											villages.map(village => (
												<SelectItem value={String(village.id)} key={village.id}>
													{village.name}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
							</>
						) : null}
					</div>

					<div className='flex flex-col items-center justify-center'>
						<div className='flex items-center justify-center mt-5 border w-[150px] h-[150px] rounded-full'>
							<div className='text-white text-4xl font-bold flex flex-wrap flex-col text-center'>
								<span>{userCount}</span>
								<span className='text-sm font-thin'> Маман тіркелді</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Statistic
