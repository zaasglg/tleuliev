"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import React, {useEffect, useState} from "react";
import {User} from "@/types/user.types";
import {Loader} from "lucide-react";
import Loading from "@/app/profile/loading";
import fetchData from "@/utils/api/fetchData";

export default function Profile() {

    const [userData, setUserData] = useState<User | null>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData("user")
            .then((res) => {
                if (res.status === 200) {
                    setUserData(res.data);
                }
            })
            .catch((error) => {
                console.error("Failed to fetch user data:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    return (
        <>
            <section>
                <div>
                    <h2 className="text-4xl font-medium">Жеке кабинет</h2>
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
                            <BreadcrumbPage>Жеке кабинет</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </section>

            {loading && <Loading />}

            {!loading && <section className="mt-5 space-y-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-normal">
                            Жеке деректер 
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <Label>Аты жөні</Label>
                                <Input value={userData ? userData.name : ""} readOnly/>
                            </div>
                            <div>
                                <Label>Email</Label>
                                <Input value={userData ? userData.email : ""} readOnly/>
                            </div>
                            <div>
                                <Label>Телефон номер</Label>
                                <Input value={userData ? userData.phone : ""} readOnly/>
                            </div>
                            <div>
                                <Label>Туылған күні</Label>
                                <Input value={userData ? userData.birthday : ""} readOnly/>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-normal">
                            Қала
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <Label>Облыс</Label>
                                <Input value={userData ? userData.region_name : ""} readOnly/>
                            </div>
                            <div>
                                <Label>Аудан қала</Label>
                                <Input value={userData ? userData.district_name : ""} readOnly/>
                            </div>
                            <div>
                                <Label>Округ</Label>
                                <Input value={userData ? userData.village_name: ""} readOnly/>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>}

        </>
    )
}