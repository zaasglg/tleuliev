"use client"

import React, {useEffect, useState, use} from "react";
import {CheckCheck, Minus, Search} from "lucide-react";
import CardTest from "@/app/test/card-test";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {UserAnswer} from "@/types/user-answer.types";
import Loading from "@/app/profile/loading";
import {ResultUser} from "@/types/result-user";
import { Progress } from "@/components/ui/progress"
import fetchData from "@/utils/api/fetchData";

export default function Page() {

    // user answers
    const [userAnswers, setUserAnswers] = useState<{
        loading: boolean;
        results: UserAnswer[];
        error: string | null;
    }>({
        loading: true,
        results: [],
        error: null
    });

    const [resultUser, setResultUser] = useState<{
        loading: boolean;
        result: ResultUser | null;
        error: string | null;
    }>({
        loading: true,
        result: null,
        error: null
    });

    useEffect(() => {

        // fetch answers
        fetchData("user-answers/user")
            .then(res => {
                if (res.status === 200) {
                    setUserAnswers({
                        loading: false,
                        results: res.data,
                        error: "",
                    })
                }
            })
            .finally(() => {
                setUserAnswers((prevState) => ({
                    ...prevState,
                    loading: false,
                }));
            })

        fetchData("result/user")
            .then(res => {
                if (res.status === 200) {
                    setResultUser({
                        loading: false,
                        result: res.data,
                        error: null
                    })
                }
            })

    }, []);



    return (
        <>
            <section>
                <div className="flex justify-between items-center gap-10">
                    <div>
                        <h2 className="text-4xl font-medium">Статистика {userAnswers.loading}</h2>
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
                            <BreadcrumbPage>Статистика</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>


            </section>

            { userAnswers.loading && <Loading /> }


            {!userAnswers.loading && (
                <section className="mt-10">

                    <div className="grid grid-cols-2 gap-5">
                        <Card>
                            <CardHeader>
                                <CardDescription>тапсырған тесттер</CardDescription>
                                <CardTitle>{resultUser.result?.completed_tests}/{ resultUser.result?.total_tests }</CardTitle>
                            </CardHeader>

                            <CardContent>
                                <Progress value={33} />
                            </CardContent>

                        </Card>

                        <Card>
                            <CardHeader>
                                <CardDescription>Сізге қойылған тапсырмалар</CardDescription>
                                <CardTitle>1 <span className="font-normal">тапсырма</span></CardTitle>
                            </CardHeader>

                            <CardContent>
                                <Button>
                                    Тапсырмаларды қарау
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-3">
                        <CardHeader>
                            <CardTitle className="text-xl font-medium">Статистика</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Тест сұрағы</TableHead>
                                        <TableHead>Жауабы</TableHead>
                                        <TableHead>Дұрыс/Бұрыс</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {userAnswers && userAnswers.results.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.test.question}</TableCell>
                                            <TableCell>{item.answer.answer}</TableCell>
                                            <TableCell>{item.answer.correct ? (
                                                <div className="w-8 h-8 rounded-full bg-blue-500 flex justify-center items-center">
                                                    <CheckCheck color="white" size={18} />
                                                </div>
                                            ) : (
                                                <div
                                                    className="w-8 h-8 rounded-full bg-red-500 flex justify-center items-center">
                                                    <Minus color="white" size={18}/>
                                                </div>
                                            )}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                </section>
            )}


        </>
    )
}