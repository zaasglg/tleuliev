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
import {useTests, useUser} from "@/utils/api-requests";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Link from "next/link";

export default function Page() {
    const { data, error, isLoading} = useTests();

    return (
        <>
            <section>
                <div className="flex justify-between items-center gap-10">
                    <div>
                        <h2 className="text-4xl font-medium">Тесттер</h2>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Button variant="outline" asChild>
                            <Link href="/admin/test/create">
                                Қосу
                            </Link>
                        </Button>
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
                            <BreadcrumbPage>Тесттер</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>


            </section>
            {isLoading && <div className="h-[550px] w-full flex justify-center items-center"><span>Загрузка...</span></div>}
            {error && <p>Error loading tests: {error.message}</p>}
            <section className="mt-10">
                {!isLoading && <Card className="mt-10">
                    <CardHeader>
                        <CardTitle className="text-xl font-medium">Тесттер</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#ID</TableHead>
                                    <TableHead>Сұрағы</TableHead>
                                    <TableHead></TableHead>
                                    <TableHead></TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data && data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.question}</TableCell>
                                        <TableCell>
                                            <Button>
                                                Өзгерту
                                            </Button>
                                        </TableCell>

                                        <TableCell>
                                            <Button className="bg-red-500 hover:bg-red-600">
                                                Жою
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>}
            </section>


        </>
    )
}