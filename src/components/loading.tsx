"use client"
import Logo from "@/components/Logo";
import {useEffect, useState} from "react";

export default function Loading() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <>
            {
                isLoading
                    ? (
                        <div className="h-screen bg-white flex flex-col justify-center items-center relative">
                            <Logo color="rgb(59 130 246)" size={30}/>
                            <div className="flex space-x-2 mt-5">
                                <div className="bg-blue-500 h-2 w-2 rounded-sm animate-bounce animation-delay-0"></div>
                                <div className="bg-blue-500 h-2 w-2 rounded-sm animate-bounce animation-delay-200"></div>
                                <div className="bg-blue-500 h-2 w-2 rounded-sm animate-bounce animation-delay-400"></div>
                            </div>
                        </div>
                    )
                    : null
            }
        </>
    );
}
