import {
    Inter,
    Montserrat_Alternates,
    Bebas_Neue,
    Lusitana,
    Roboto
} from "next/font/google";

import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });
const montserrat_alternates = Montserrat_Alternates({
    weight: ['100', '200', '300', "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});
const bebas_neue = Bebas_Neue({
    weight: ['400'],
    subsets: ['latin']
})
const lusitana = Lusitana({
    weight: ['400', '700'],
    subsets: ['latin']
})
const roboto = Roboto({
    weight: ['100', '300', '400', '500', '700', '900'], subsets: ['latin', 'cyrillic']
})


export { inter, montserrat_alternates, bebas_neue, lusitana, roboto }