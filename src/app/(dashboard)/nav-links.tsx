"use client";


import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
    TvMinimal,
    User,
    ListTodo, ChartBar, Files, MessageCircle
} from "lucide-react";
import {useUser} from "@/utils/api-requests";

const links = [
    { name: 'Басты бет', href: '/', icon: <TvMinimal /> },
    { name: 'Жеке кабинет', href: '/profile', icon: <User /> },
    { name: 'Тест', href: '/test', icon: <ListTodo /> },
    { name: 'Статистика', href: '/result', icon: <ChartBar /> },
    { name: 'Материалдар', href: '/material', icon: <Files /> },
    { name: 'Кері байланыс', href: '/feedback', icon: <MessageCircle /> },
];

const linksAdmin = [
    { name: 'Басты бет', href: '/', icon: <TvMinimal /> },
    { name: 'Жеке кабинет', href: '/profile', icon: <User /> },
    { name: 'Тест', href: '/admin/test', icon: <ListTodo /> },
    { name: 'Статистика', href: '/admin/result', icon: <ListTodo /> },
    { name: 'Қалалар', href: '/admin/regions', icon: <ListTodo /> },
]

export default function NavLinks() {
    const pathname = usePathname();

    const {data, error, isLoading} = useUser();

    return (
        <>

            {data && data.role[0] == 'redactor' &&  links.map((link) => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                            { 'bg-sky-100 text-blue-600': pathname === link.href, },
                        )}>

                        {link.icon}
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}

            {data && data.role[0] == 'admin' &&  linksAdmin.map((link) => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                            { 'bg-sky-100 text-blue-600': pathname === link.href, },
                        )}>

                        {link.icon}
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}

        </>
    );
}