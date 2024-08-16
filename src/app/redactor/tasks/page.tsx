"use client"

import {useEffect, useState, use} from "react";
import {Plus, Search} from "lucide-react";
import CardTest from "@/app/test/card-test";

import {
    Dialog, DialogClose,
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
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Label} from "@/components/ui/label";
import axios from "axios";
import Loading from "@/app/profile/loading";
import fetchData from "@/utils/api/fetchData";
import {Textarea} from "@/components/ui/textarea";
import {User} from "@/types/user.types";
import { Task } from "@/types/task.types";
import { log } from "console";

export default function Page() {
    const [formData, setFormData] = useState({
        title: "",
        message: ""
    })

    const [modal, setModal] = useState(false);

    const [tasks, setTasks] = useState<{
        loading: boolean;
        result: Task[];
        error: string;
    }>({
        loading: true,
        result: [],
        error: ""
    });


    useEffect(() => {

        fetchData('tasks/filter/redactor')
            .then(res => {
                if (res.status === 200) {
                    setTasks({
                        loading: false,
                        result: res.data,
                        error: ""
                    })
                } else {
                    console.error("Error fetching data:", res.message);
                }
            })

    }, []);

    return (
        <>
            <section>
                <div className="flex justify-between items-center gap-10">
                    <div>
                        <h2 className="text-4xl font-medium">Жылдық тапсырма</h2>
                    </div>

                    <div>
                        <Button variant="outline" onClick={() => setModal(true)}>
                            Тапсырма беру
                        </Button>


                        {/*modal*/}
                        <Dialog open={modal}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Тапсырма беру</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-3">
                                    <div>
                                        <Label>
                                            Тақырыбы
                                        </Label>
                                        <Input
                                            placeholder=""
                                            value={formData.title}
                                            onChange={(event) => {
                                                setFormData({
                                                    ...formData,
                                                    title: event.target.value
                                                })
                                            }}
                                        />
                                    </div>

                                    <div className="mt-5">
                                        <Label>
                                            Пікір
                                        </Label>
                                        <Textarea
                                            placeholder=""
                                            value={formData.message}
                                            onChange={(event) => {
                                                setFormData({
                                                    ...formData,
                                                    message: event.target.value
                                                })
                                            }}
                                        />
                                    </div>

                                    <Button type="button" onClick={() => {
                                        fetchData("feedbacks", "POST", formData)
                                            .then(res => {
                                                setModal(false)
                                            })
                                    }}>
                                        Жіберу
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
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
                            <BreadcrumbPage>Кері байланыс</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>


            </section>

            { tasks.loading && <Loading /> }


            {!tasks.loading && (
                <Card className="mt-10">
                    <CardHeader>
                        <CardTitle className="text-xl font-medium">Пікірлер</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Маман</TableHead>
                                    <TableHead>Тест (#id)</TableHead>
                                    <TableHead>Тест (Сұрақ)</TableHead>
                                    <TableHead>Әрекет</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tasks && tasks.result.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.user.name} / {item.user.phone}</TableCell>
                                        <TableCell>#{item.test.id}</TableCell>
                                        <TableCell>{item.test.question}</TableCell>
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
                </Card>
            )}


        </>
    )
}