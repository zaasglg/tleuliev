"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {CheckCheck, ChevronLeft} from "lucide-react";
import React, {useState} from "react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {useRouter} from "next/navigation";

export default function TestDetail({ params }: {
    params: { id: number }
}) {
    const [modal, setModal] = useState(false);

    return (
        <>
            <AlertDialog open={modal}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Сіздің жауабыңыз қабылданды</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => {
                            setModal(false)
                        }}>Жабу</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <section>
                <div className="flex justify-between items-center gap-10">
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" className="w-9 h-9 p-2" asChild>
                            <Link href="/test">
                                <ChevronLeft />
                            </Link>
                        </Button>
                        <h2 className="text-4xl font-medium">Тест #Э11 {modal}</h2>
                    </div>
                </div>

                {/*breadcrumb*/}
                <Breadcrumb className="mt-5">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                Басты бет
                                {/*<Link href="/">*/}
                                {/*    Басты бет*/}
                                {/*</Link>*/}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                Тесттер
                                {/*<Link href="/test">*/}
                                {/*    Тесттер*/}
                                {/*</Link>*/}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Тест #Э11</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

            </section>


            <section className="mt-5">

                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-normal">
                            Эпизоотология дегеніміз -
                        </CardTitle>
                    </CardHeader>
                    <CardContent>

                        <RadioGroup defaultValue="option-one">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-one" id="option-one"/>
                                <Label htmlFor="option-one">Жануарлардың жұқпалы (жұқпалы) ауруларының пайда болу,
                                    таралу және жойылу (тоқтату) заңдылықтары, олардың алдын алу және олармен күресу
                                    әдістері туралы ғылым.</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-two" id="option-two"/>
                                <Label htmlFor="option-two">Жануарлар арасында жұқпалы аурулардың пайда болуының,
                                    көрінуінің, таралуының, тоқтатылуының объективті заңдылықтары және олардың алдын алу
                                    және жою әдістері туралы ғылым.</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-three" id="option-three"/>
                                <Label htmlFor="option-three">Екі жауап та дұрыс.</Label>
                            </div>
                        </RadioGroup>

                    </CardContent>

                    <CardFooter>
                        <Button className="space-x-3" onClick={() => {
                            setModal(true);
                            console.log("ewf")
                        }}>
                            <span className="uppercase" >Жауапты қабылдау</span>
                            <CheckCheck size={18} />
                        </Button>
                    </CardFooter>
                </Card>

            </section>

        </>
    )
}