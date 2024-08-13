"use client"

import {useEffect, useState, use} from "react";
import {Search} from "lucide-react";
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

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {useResult} from "@/utils/api-requests";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

export default function Page() {
    const [lang, setLang] = useState("kk");

    const { data: res, error: resError, isLoading: resLoading} = useResult();

    return (
        <>
            <section>
                <div className="flex justify-between items-center gap-10">
                    <div>
                        <h2 className="text-4xl font-medium">Статистика</h2>
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
            {resLoading && <div className="h-[550px] w-full flex justify-center items-center"><span>Загрузка...</span></div>}
            {resError && <p>Error loading tests: {resError.message}</p>}


            {!resLoading && <Card className="mt-10">
                <CardHeader>
                    <CardTitle className="text-xl font-medium">Статистика</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>Статистика тізімі</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Тест сұрағы</TableHead>
                                <TableHead>Жауабы</TableHead>
                                <TableHead>Дұрыс/Бұрыс</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {res && res.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.test.question}</TableCell>
                                    <TableCell>{item.answer.answer}</TableCell>
                                    <TableCell>{item.answer.correct ? 'Дұрыс' : 'Бұрыс'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>}


        </>
    )
}