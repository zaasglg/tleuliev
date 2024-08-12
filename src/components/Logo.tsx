import {bebas_neue, lusitana, roboto} from "@/utils/fonts";

export default function Logo({ color, size }: { color: string, size: number }) {
    return (
        <span className={`${roboto.className} font-bold`}
              style={{ color: color, fontSize: `${size}px` }}>
            Tleuliev Test
        </span>
    )
}