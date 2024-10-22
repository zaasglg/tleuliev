import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CardTest({
	id,
	keyQuestion,
	question,
	question_ru,
}: {
	id: number
	keyQuestion: string
	question: string
	question_ru: string
}) {
	return (
		<Card className='h-full flex flex-col justify-between'>
			<CardHeader>
				<CardTitle className='space-x-2'>
					<Badge className='border border-gray-300 bg-transparent text-gray-800 font-normal hover:bg-sky-100'>
						#{keyQuestion}
					</Badge>
				</CardTitle>
				<CardDescription>{question}</CardDescription>
			</CardHeader>
			<CardContent className=''>
				<Button
					className='uppercase space-x-3 hover:bg-blue-500 hover:text-white'
					variant='outline'
					asChild
				>
					<Link href={`/test/${id}`}>
						<span>Тапсыру</span>
						<ArrowRight size={14} />
					</Link>
				</Button>
			</CardContent>
		</Card>
	)
}
