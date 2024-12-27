export interface User {
	id: number
	name: string
	phone: number
	role: string[]
	district_id?: number
	district_name?: string
	village_id?: number
	village_name?: string
	region_id?: number
	region_name?: string
}
