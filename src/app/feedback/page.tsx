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
import {useFeedback} from "@/utils/api-requests";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Label} from "@/components/ui/label";
import axios from "axios";

export default function Page() {
    const [lang, setLang] = useState("kk");

    const { data: res, error: resError, isLoading: resLoading} = useFeedback();
    const [formData, setFormData] = useState({
        title: "",
        message: ""
    })

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/feedback', JSON.stringify({
                user_id: 1,
                title: formData.title,
                message: formData.message
            }));

            console.log(response.data)
            if (response.status === 200) {
                // setModal(true)
            }
        } catch (error) {
            // @ts-ignore
            console.log(error.message)
        }
    };

    return (
        <>
            <section>
                <div className="flex justify-between items-center gap-10">
                    <div>
                        <h2 className="text-4xl font-medium">Кері байланыс</h2>
                    </div>

                    <div>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">
                                    Кері байланыс қалдыру
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Кері байланыс</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-3">
                                    <div>
                                        <Label>
                                            Тақырыбы {formData.title}
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
                                            Пікір {formData.message}
                                        </Label>
                                        <Input
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

                                    <DialogClose asChild>
                                        <Button type="button" onClick={handleSubmit}>
                                            Жіберу
                                        </Button>
                                    </DialogClose>
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
            {resLoading && <div className="h-[550px] w-full flex justify-center items-center"><span>Загрузка...</span></div>}
            {resError && <p>Error loading tests: {resError.message}</p>}


            {!resLoading && <Card className="mt-10">
                <CardHeader>
                    <CardTitle className="text-xl font-medium">Пікірлер</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>Пікірлер тізімі</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Тақырыбы</TableHead>
                                <TableHead>Хат</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {res && res.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.message}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>}


        </>
    )
}