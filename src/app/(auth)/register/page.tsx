"use client"

import Link from "next/link";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";

// Steps
import ThirdStep from "@/app/(auth)/register/third-step";
import FirstStep from "@/app/(auth)/register/first-step";
import SecondStep from "@/app/(auth)/register/second-step";
import FourthStep from "@/app/(auth)/register/fourth-step";
import {useRegisterUser} from "@/utils/api-requests";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {ArrowLeft, ArrowRight, ChevronRight} from "lucide-react";
import { useRouter } from 'next/navigation'
import {UserProps} from "@/utils/type";

export default function Login() {

    const router = useRouter()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<UserProps>({
        role: 'user',
        name: '',
        email: '',
        phone: '',
        profession: '',
        birthday: '',
        region: 0,
        district: 0,
        village: 0,
        password: '',
        passwordC: '',
        errors: {}
    })



    const [modal, setModal] = useState(false);


    const handleSuccess = (data: { message: string }) => {
        console.log(data)
    };

    const handleError = (error: Error) => {
        console.log(error.message)
        // setModal(false)
    };

    const { mutate: register } = useRegisterUser(handleSuccess, handleError);

    // validation
    const validateStep = () => {
        const errors = {} as Record<string, string>;

        if (step === 1) {
            if (!formData.name) errors.name = "Аты жөні міндетті түрде толтырылу керек";
            if (!formData.email) errors.email = "Email міндетті түрде толтырылу керек";
        } else if (step === 2) {
            if (!formData.phone) errors.phone = "Телефон номер міндетті түрде толтырылу керек";
            if (!formData.profession) errors.profession = "Мамандық міндетті түрде толтырылу керек";
            if (!formData.birthday) errors.birthday = "Туылған күн міндетті түрде толтырылу керек";
        } else if (step === 3) {
            if (formData.region === 0) errors.region = "Аймақ міндетті түрде таңдалуы керек";
            if (formData.district === 0) errors.district = "Аудан міндетті түрде таңдалуы керек";
            if (formData.village === 0) errors.village = "Ауыл міндетті түрде таңдалуы керек";
        } else if (step === 4) {
            if (!formData.password) errors.password = "Құпиясөз міндетті түрде толтырылу керек";
            // if (formData.password !== formData.passwordC) errors.passwordC = "Құпиясөздер сәйкес емес";
        }

        setFormData({ ...formData, errors });

        return Object.keys(errors).length === 0;
    };

    // handle submit
    const handleSubmit = () => {
        if (!validateStep()) return;

        switch (step) {
            case 1:
                setStep(2);
                console.log("ewf")
                break;
            case 2:
                setStep(3);
                break;
            case 3:
                setStep(4);
                break;
            case 4:
                console.log("ewfwe")
                register({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                    birthday: formData.birthday,
                    region_id: formData.region,
                    district_id: formData.district,
                    village_id: formData.village,
                    role: formData.role
                });
                break;
            default:
                break;
        }
    };


    return (
        <>

            {/*Modal*/}
            <AlertDialog open={modal}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Сіз Сәтті тіркелдіңіз</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => {
                            setModal(false);
                        }}>Бас тарту</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                            setModal(false)
                            router.push('/login')
                        }}>Аккаунтқа кіру</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className="w-full lg:grid lg:min-h-screen  lg:grid-cols-2">
                <div className="bg-sky-50 block h-[300px] lg:h-full">
                    <div className="flex justify-center items-center h-full">
                        <div className="text-center">
                            <h2 className="text-3xl font-medium">Сені көргеніме қуаныштымын</h2>
                            <span
                                className="font-[300] block leading-none my-3">ветеринарлык медицина бойынша теориялық <br/> білімді арттыру платформасы</span>
                            <Button asChild variant={"outline"} className="w-full mt-3">
                                <Link
                                    href="/login">
                                    Кіру
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="flex justify-center items-center">
                            <div className="mx-auto w-full max-w-sm lg:w-96">
                                <div className="grid gap-2 text-left">
                                    <h1 className="text-3xl font-bold">Тіркелу</h1>
                                </div>

                                <div className="mt-8">

                                    <div className="mt-6">
                                    <form className="space-y-3">

                                            { step === 1 ? ( <FirstStep formData={formData} setFormData={setFormData}/>) : null}
                                            { step === 2 ? (<SecondStep formData={formData} setFormData={setFormData}/>) : null}
                                            { step === 3 ? (<ThirdStep formData={formData} setFormData={setFormData}/>) : null}
                                            { step === 4 ? (<FourthStep formData={formData} setFormData={setFormData}/>) : null}


                                            <div className="flex space-x-3">

                                                {
                                                    step > 1
                                                        ? <Button
                                                            onClick={() => {
                                                                setStep((prev) => prev - 1)
                                                            }}
                                                            type="button"
                                                            variant="outline"
                                                            className="w-full space-x-2">
                                                                <ArrowLeft  size={15} />
                                                                <span>Артқа</span>
                                                            </Button>

                                                        : null
                                                }

                                                <Button
                                                    onClick={handleSubmit}
                                                    type="button"
                                                    className="w-full space-x-2"
                                                >
                                                    <span>{step < 4 ? "Келесі" : "Тіркелу"}</span>
                                                    <ArrowRight size={15} />
                                                </Button>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
