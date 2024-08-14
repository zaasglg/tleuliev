"use client"

import Link from "next/link";
import Logo from "@/components/Logo";
import {PanelRightClose, PanelRightOpen, PowerIcon} from "lucide-react";
import NavLinks from "@/app/(dashboard)/nav-links";
import {cookies} from "next/headers";
import {useRouter} from "next/navigation";
import {useUser} from "@/utils/api-requests";

export default function Aside() {
    const router = useRouter()

    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link
                className="relative mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
                href="/"
            >
                <div className="w-32 text-white md:w-40">
                    <Logo color="white" size={20} />
                </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks/>
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                <form>
                    <button
                        type="button"
                        onClick={async () => {
                            try {
                                const response = await fetch('/api/logout', {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                });

                                if (!response.ok) return


                                router.push("/login")
                            } catch (error) {
                                console.log("error")
                            }
                        }}
                        className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3">
                        <PowerIcon className="w-6"/>
                        <div className="hidden md:block">Шығу</div>
                    </button>
                </form>
            </div>
        </div>
    )
}