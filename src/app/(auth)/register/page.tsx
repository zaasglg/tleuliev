"use client"

import Logo from "@/components/Logo";
import {lusitana} from "@/utils/fonts";
import Link from "next/link";
import FormInput from "@/components/form-input";
import React, {useState} from "react";
import clsx from "clsx";
import {ChevronLeft, ChevronRight} from "lucide-react";
import Stepper from "@/app/register/stepper";
import FormSelect from "@/components/form-select";
import Region from "@/app/register/region";

export default function Login() {

    const [step, setStep] = useState(1)
    const [role, setRole] = useState("user");

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white grid grid-cols-2 w-8/12 mx-auto rounded-xl">
                <div className="order-2 h-full flex justify-center items-center p-10">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <Logo color="rgb(59 130 246)" size={20}/>
                        </div>

                        <div className="mt-8">

                            <div className="mt-6">
                                <form className="space-y-6">


                                    {/*first step*/}
                                    {
                                        step === 1
                                            ? (
                                                <>
                                                    <div
                                                        className="bg-gray-100 rounded-md grid grid-cols-2 p-2 relative items-center">
                                                        <button
                                                            onClick={() => setRole("user")}
                                                            className={clsx(
                                                                "w-full flex justify-center",
                                                                {
                                                                    "bg-blue-500 text-white py-1 rounded": role == "user"
                                                                }
                                                            )}>
                                                            Тапсырушы
                                                        </button>
                                                        <button
                                                            onClick={() => setRole("redactor")}
                                                            className={clsx(
                                                                "w-full flex justify-center",
                                                                {
                                                                    "bg-blue-500 text-white py-1 rounded": role == "redactor"
                                                                }
                                                            )}>
                                                            Тексеруші
                                                        </button>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="name"
                                                               className="block text-sm font-medium text-gray-700">
                                                            Аты жөні (Куәліктегі)
                                                        </label>
                                                        <div className="mt-1">
                                                            <FormInput id="name" type="text" name="name"/>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="email"
                                                               className="block text-sm font-medium text-gray-700">
                                                            Почта
                                                        </label>
                                                        <div className="mt-1">
                                                            <FormInput id="email" type="email" name="email"/>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                            : null
                                    }


                                    {/*second step*/}
                                    {
                                        step === 2
                                            ? (
                                                <>
                                                    <div>
                                                        <label htmlFor="phone_number"
                                                               className="block text-sm font-medium text-gray-700">
                                                            Телефон номер
                                                        </label>
                                                        <div className="mt-1">
                                                            <FormInput id="phone_number" type="text"
                                                                       name="phone_number"/>
                                                        </div>
                                                    </div>


                                                    <div className="space-y-1">
                                                        <label htmlFor="profession"
                                                               className="block text-sm font-medium text-gray-700">
                                                            Мамандық
                                                        </label>
                                                        <div className="mt-1">
                                                            <FormInput id="profession" type="text" name="profession"/>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                            : null
                                    }

                                    {/*third step*/}
                                    {
                                        step === 3
                                            ? (
                                                <Region />
                                            )
                                            : null
                                    }

                                    {/*fourth step*/}
                                    {
                                        step === 4
                                            ? (
                                                <>
                                                    <div className="space-y-1">
                                                        <label htmlFor="password"
                                                               className="block text-sm font-medium text-gray-700">
                                                            Құпиясөз
                                                        </label>
                                                        <div className="mt-1">
                                                            <FormInput id="password" type="password" name="password"/>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-1">
                                                        <label htmlFor="password"
                                                               className="block text-sm font-medium text-gray-700">
                                                            Құпия сөзді қайталаыңыз
                                                        </label>
                                                        <div className="mt-1">
                                                            <FormInput id="password" type="password" name="password"/>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                            : null
                                    }


                                    <div>
                                        <button
                                            onClick={() => setStep(prev => prev + 1)}
                                            type="button"
                                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            { step < 4 ? "Келесі" : "Тіркелу" }
                                        </button>

                                        <Stepper step={ step } setStep={ setStep } />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-1 bg-gradient-to-r from-sky-500 to-indigo-500 p-10 rounded-tl-xl rounded-bl-xl">
                    <div className="flex justify-center items-center h-full">
                        <div className="text-center">
                            <h2 className="text-3xl text-white font-medium">Сені көргеніме қуаныштымын</h2>
                            <span className="text-white font-[300] block leading-none my-3">ветеринарлык медицина бойынша теориялық <br/> білімді арттыру платформасы</span>
                            <Link
                                href="/login"
                                className="block mt-5 w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-blue-500 bg-white hover:bg-blue-500 hover:text-white focus:outline-none">
                                Кіру
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
