export interface Test {
	id: number
	key: string
	question: string
	question_ru: string
	answers: Answer[]
}
export interface Answer {
	id: number
	test_id: number
	answer: number
	lang: string
	correct: boolean
}
