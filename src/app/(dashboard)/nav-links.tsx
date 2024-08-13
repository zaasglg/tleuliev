"use client";


import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
    TvMinimal,
    User,
    ListTodo, ChartBar, Files, MessageCircle
} from "lucide-react";


// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    { name: 'Басты бет', href: '/', icon: <TvMinimal /> },
    { name: 'Жеке кабинет', href: '/profile', icon: <User /> },
    { name: 'Тест', href: '/test', icon: <ListTodo /> },
    { name: 'Статистика', href: '/result', icon: <ChartBar /> },
    { name: 'Материалдар', href: '/material', icon: <Files /> },
    { name: 'Кері байланыс', href: '/feedback', icon: <MessageCircle /> },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'bg-sky-100 text-blue-600': pathname === link.href,
                            },
                        )}
                    >
                        {link.icon}
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}