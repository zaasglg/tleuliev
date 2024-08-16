"use client";

import { usePathname } from "next/navigation";
import {
    TvMinimal,
    ListTodo,
    ChartBar,
    Files,
    MessageCircle, Users, Contact,
    ClipboardCheck,
} from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { User } from "@/types/user.types";
import {Skeleton} from "@/components/ui/skeleton";
import fetchData from "@/utils/api/fetchData";

type NavLink = {
    name: string;
    href: string;
    icon: JSX.Element;
};

export default function NavLinks() {
    const pathname = usePathname();
    const [userData, setUserData] = useState<User | null>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData("user")
            .then((res) => {
                if (res.status === 200) {
                    setUserData(res.data);
                }
            })
            .catch((error) => {
                console.error("Failed to fetch user data:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    const links: NavLink[] = useMemo(
        () => [
            { name: "Басты бет", href: "/", icon: <TvMinimal /> },
            { name: "Жеке кабинет", href: "/profile", icon: <Contact /> },
            { name: "Мамандар", href: "/redactor/users", icon: <Users /> },
            { name: "Жылдық жоспар", href: "/redactor/tasks", icon: <ClipboardCheck /> },
        ],
        []
    );

    const linksAdmin: NavLink[] = useMemo(
        () => [
            { name: "Басты бет", href: "/", icon: <TvMinimal /> },
            { name: "Жеке кабинет", href: "/profile", icon: <Contact /> },
            { name: "Тест", href: "/admin/test", icon: <ListTodo /> },
            { name: "Статистика", href: "/admin/result", icon: <ListTodo /> },
            { name: "Қалалар", href: "/admin/regions", icon: <ListTodo /> },
        ],
        []
    );

    const linksUser: NavLink[] = useMemo(
        () => [
            { name: "Басты бет", href: "/", icon: <TvMinimal /> },
            { name: "Жеке кабинет", href: "/profile", icon: <Contact /> },
            { name: "Тест", href: "/test", icon: <ListTodo /> },
            { name: "Статистика", href: "/result", icon: <ChartBar /> },
            { name: "Материалдар", href: "/material", icon: <Files /> },
            { name: "Кері байланыс", href: "/feedback", icon: <MessageCircle /> },
        ],
        []
    );
    const renderLinks = (linksToRender: NavLink[]) =>
        linksToRender.map((link: NavLink) => (
            <Link
                key={link.name}
                href={link.href}
                className={clsx(
                    "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                    {
                        "bg-sky-100 text-blue-600": pathname === link.href,
                    }
                )}
            >
                {link.icon}
                <p className="hidden md:block">{link.name}</p>
            </Link>
        ));

    if (loading) {
        return <>
            {links.map(item => (
                <div key={item.href}
                    className="animate-pulse flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                    <Skeleton className="w-7 h-7 rounded bg-gray-300" />
                    <Skeleton className="w-24 h-2 rounded bg-gray-300" />
                </div>
            ))}
        </>;
    }

    if (!userData) {
        return null; // Optional: Add a fallback UI if user data fails to load
    }

    return (
        <>
            {userData.role[0] === "redactor" && renderLinks(links)}
            {userData.role[0] === "admin" && renderLinks(linksAdmin)}
            {userData.role[0] === "user" && renderLinks(linksUser)}
        </>
    );
}
