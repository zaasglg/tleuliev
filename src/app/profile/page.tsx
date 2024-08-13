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
import {useUser} from "@/utils/api-requests";

export default function Profile() {

    const {data, error, isLoading} = useUser();


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

            {
                isLoading
                    ? <div className="h-[550px] w-full flex justify-center items-center">
                        <span>Загрузка...</span>
                    </div>
                    : <section className="mt-5 space-y-3">
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
                                        <Input value={data && data.name} readOnly/>
                                    </div>
                                    <div>
                                        <Label>Email</Label>
                                        <Input value={data && data.email} readOnly/>
                                    </div>
                                    <div>
                                        <Label>Телефон номер</Label>
                                        <Input value={data && data.phone} readOnly/>
                                    </div>
                                    <div>
                                        <Label>Туылған күні</Label>
                                        <Input value={data && data.birthday} readOnly/>
                                    </div>
                                    <div>
                                        <Label>Рөлі</Label>
                                        <Input value={data && data.role[0]} readOnly/>
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
                                        <Input value={data && data.region_name} readOnly/>
                                    </div>
                                    <div>
                                        <Label>Аудан қала</Label>
                                        <Input value={data && data.district_name} readOnly/>
                                    </div>
                                    <div>
                                        <Label>Округ</Label>
                                        <Input value={data && data.village_name} readOnly/>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>
            }

        </>
    )
}