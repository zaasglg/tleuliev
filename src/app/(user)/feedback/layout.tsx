import LayoutsApp from '@/app/(dashboard)/layouts-app'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Кері байланыс',
	description: '...',
}

export default function ResultLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <LayoutsApp>{children}</LayoutsApp>
}
