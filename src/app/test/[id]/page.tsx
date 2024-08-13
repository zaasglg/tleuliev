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
import {Answer} from "@/types/test.types";
import {useDistricts, useTest} from "@/utils/api-requests";
import CardTest from "@/app/test/card-test";
import {Label} from "@/components/ui/label";
import axios from "axios";

export default function TestDetail({ params }: {
    params: { id: number },
}) {
    const [modal, setModal] = useState(false);
    const [answer, setAnswer] = useState("");
    const { data: test,
        error: testError,
        isLoading: testLoading
    } = useTest(params.id);

    const router  = useRouter();

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/pass', JSON.stringify({
                user_id: 1,
                test_id: test && test.id,
                answer_id: answer
            }));

            if (response.status === 200) {
                setModal(true)
            }
        } catch (error) {
            // @ts-ignore
            console.log(error.message)
        }
    };

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
                            router.push('/test')
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
                        <h2 className="text-4xl font-medium">Тест #{ test && test.key }</h2>
                    </div>
                </div>

                {/*breadcrumb*/}
                <Breadcrumb className="mt-5">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                Басты бет
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                Тесттер
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Тест #{ test && test.key }</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

            </section>


            {
                testLoading
                    ? <div className="h-[550px] w-full flex justify-center items-center">
                        <span>Загрузка...</span>
                    </div>
                    : <section className="mt-5">

                        {testError && <p>Error loading tests: {testError.message}</p>}

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl font-normal">
                                    {test && test.question}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>

                                <RadioGroup onValueChange={(value) => setAnswer(value)}>
                                    {test && test.answers.map((answer) => (
                                        <div key={answer.id} className="flex items-center space-x-2">
                                            <RadioGroupItem value={answer.id.toString()}/>
                                            <Label htmlFor="option-one">{answer.answer}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>

                            </CardContent>

                            <CardFooter>
                                <Button className="space-x-3" onClick={handleSubmit}>
                                    <span className="uppercase">Жауапты қабылдау</span>
                                    <CheckCheck size={18}/>
                                </Button>
                            </CardFooter>
                        </Card>

                    </section>
            }

        </>
    )
}