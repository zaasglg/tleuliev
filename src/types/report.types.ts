interface Report {
	id: number
	admin_id: number
	plan: string
	user: {
		id: number
		name: string
		phone: string
		email: string
		region: {
			id: number
			name: string
		}
		district: {
			id: number
			name: string
		}
		village: {
			id: number
			name: string
		}
	}
	done: string
	done_pct: string
	correct: string
	correct_pct: string
}
