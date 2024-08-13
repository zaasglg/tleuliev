"use client"

import Link from "next/link";
import {useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function Login() {

    const router = useRouter()

    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        phone: '',
        password: ''
    })

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/login', JSON.stringify(formData));
            router.push("/")
        } catch (error) {
            setError((error as Error).message);
        }
    };

    return (
        <>
            <div className="w-full lg:grid lg:min-h-screen  lg:grid-cols-2">
                <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-left">
                            <h1 className="text-3xl font-bold">Кіру</h1>
                        </div>

                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Телефон номер</Label>
                                <Input
                                    id="phone"
                                    type="phone"
                                    placeholder="+7 телефон номер"
                                    value={formData.phone}
                                    onChange={(event) => {
                                        setFormData({
                                            ...formData,
                                            phone: event.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Құпия сөз</Label>
                                    <Dialog>
                                        <DialogTrigger className="ml-auto inline-block text-sm underline">Құпия сөзді ұмыттым</DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Құпиясөзді қалпына келтіру</DialogTitle>
                                                <DialogDescription>
                                                    Біз сіздің почтаңызға sms түріңде жаңа құпия сөзіңізді жібереміз
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex w-full max-w-sm items-center space-x-2">
                                                <Input type="email" placeholder="Email" />
                                                <Button type="submit">Жіберу</Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>

                                    {/*<Link*/}
                                    {/*    href="/forgot-password"*/}
                                    {/*    className="ml-auto inline-block text-sm underline">*/}
                                    {/*    Құпия сөзді ұмыттым*/}
                                    {/*</Link>*/}
                                </div>
                                <Input id="password"
                                       type="password"
                                       placeholder="*********"
                                       value={formData.password}
                                       onChange={(event) => {
                                           setFormData({
                                               ...formData,
                                               password: event.target.value,
                                           });
                                       }}
                                />
                            </div>

                            {
                                error
                                    ? <p className="text-sm text-red-500 ">{error}</p>
                                    : null
                            }

                            <Button type="submit" className="w-full" onClick={handleSubmit}>
                                Кіру
                            </Button>
                        </div>
                        {/*<div className="mt-4 text-center text-sm">*/}
                        {/*    Есептік жазбаңыз жоқ па?{" "}*/}
                        {/*    <Link href="#" className="underline">*/}
                        {/*        Тіркелу*/}
                        {/*    </Link>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className="bg-sky-50 block h-[300px] lg:h-full">
                    <div className="flex justify-center items-center h-full">
                        <div className="text-center">
                            <h2 className="text-3xl font-medium">Сені көргеніме қуаныштымын</h2>
                            <span className="font-[300] block leading-none my-3">ветеринарлык медицина бойынша теориялық <br/> білімді арттыру платформасы</span>
                            <Button asChild variant={"outline"} className="w-full mt-3">
                                <Link
                                    href="/register">
                                    Тіркелу
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
