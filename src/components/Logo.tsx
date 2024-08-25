export default function Logo({ color, size }: { color: string; size: number }) {
	return (
		<span style={{ color: color, fontSize: `${size}px`, fontWeight: '900' }}>
			Tleuliev VetTest
		</span>
	)
}
