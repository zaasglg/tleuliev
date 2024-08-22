export interface Regions {
	id: number
	name: string
}

export interface Districts {
	id: number
	name: string
	region: Regions
}

export interface Villages {
	id: number
	name: string
	district: Districts
}
