"use client"

import Logo from "@/components/Logo";
import Link from "next/link";
import FormInput from "@/components/form-input";
import {useRef} from "react";
import axios from 'axios';
import {useRouter} from "next/router";
import { postLogin} from "@/api/postLogin";

export default function Login() {
    const phoneRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);


    const handleLogin = async () => {
        const phone = phoneRef.current?.value;
        const password = passwordRef.current?.value;

        if (!phone || !password) {
            console.error('Username and password are required');
            return;
        }

        try {
            postLogin(phone, password);
        } catch (error) {
            console.error('Login failed:');
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <div className="bg-white grid grid-cols-2 w-8/12 mx-auto rounded-xl">
                    <div className="h-full flex justify-center items-center p-10">
                        <div className="mx-auto w-full max-w-sm lg:w-96">
                            <div>
                                <Logo color="rgb(59 130 246)" size={20}/>
                            </div>

                            <div className="mt-8">

                                <div className="mt-6">
                                    <form onSubmit={handleLogin} className="space-y-6">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                                Email
                                            </label>
                                            <div className="mt-1">
                                                <FormInput id="phone" name="phone" type="text" ref={phoneRef}/>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label htmlFor="password"
                                                   className="block text-sm font-medium text-gray-700">
                                                Құпиясөз
                                            </label>
                                            <div className="mt-1">
                                                <FormInput id="password" name="password" type="password" ref={passwordRef}/>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="text-sm">
                                                <a href="#" className="text-xs text-gray-500 hover:text-indigo-500">
                                                    Құпия сөзді ұмыттым
                                                </a>
                                            </div>
                                        </div>

                                        <div>
                                            <button
                                                type="submit"
                                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none">
                                                Кіру
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-sky-500 to-indigo-500 p-10 rounded-tr-xl rounded-br-xl">
                        <div className="flex justify-center items-center h-full">
                            <div className="text-center">
                                <h2 className="text-3xl text-white font-medium">Сені көргеніме қуаныштымын</h2>
                                <span className="text-white font-[300] block leading-none my-3">ветеринарлык медицина бойынша теориялық <br/> білімді арттыру платформасы</span>
                                <Link
                                    href="/register"
                                    className="block mt-5 w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-blue-500 bg-white hover:bg-blue-500 hover:text-white focus:outline-none">
                                    Тіркелу
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
