import LayoutsApp from '@/app/(dashboard)/layouts-app'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Мамандар',
	description: '...',
}

export default function TestLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <LayoutsApp>{children}</LayoutsApp>
}
