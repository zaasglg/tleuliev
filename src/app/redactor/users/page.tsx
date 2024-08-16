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

export default function Page() {
    const [formData, setFormData] = useState({
        title: "",
        message: ""
    })

    const [modal, setModal] = useState(false);

    const [users, setUsers] = useState<{
        loading: boolean;
        result: User[];
        error: string;
    }>({
        loading: true,
        result: [],
        error: ""
    });


    useEffect(() => {

        fetchData('users/filter/user')
            .then(res => {
                if (res.status === 200) {
                    setUsers({
                        loading: false,
                        result: res.data,
                        error: ""
                    })
                } else {
                    console.error("Error fetching data:", res.message);
                }
            })

    }, []);

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
                        <h2 className="text-4xl font-medium">Мамандар</h2>
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

            { users.loading && <Loading /> }


            {!users.loading && (
                <Card className="mt-10">
                    <CardHeader>
                        <CardTitle className="text-xl font-medium">Пікірлер</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Аты</TableHead>
                                    <TableHead>Почта</TableHead>
                                    <TableHead>Туылған күні</TableHead>
                                    <TableHead>Байланыс номер</TableHead>
                                    <TableHead>Облыс</TableHead>
                                    <TableHead>Аудан қала</TableHead>
                                    <TableHead>Округ</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users && users.result.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.birthday}</TableCell>
                                        <TableCell>{item.phone}</TableCell>
                                        <TableCell>{item.region_name}</TableCell>
                                        <TableCell>{item.district_name}</TableCell>
                                        <TableCell>{item.village_name}</TableCell>
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