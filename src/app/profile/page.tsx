import LayoutsApp from "@/app/(dashboard)/layouts-app";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";

export default function Profile() {
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
                                {/*<Link href="/">*/}
                                {/*    Басты бет*/}
                                {/*</Link>*/}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Тесттер</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </section>

            <section className="mt-5 space-y-3">
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
                                <Input value="Ердаулет" readOnly/>
                            </div>
                            <div>
                                <Label>Email</Label>
                                <Input value="n4msin@mail.ru" readOnly/>
                            </div>
                            <div>
                                <Label>Телефон номер</Label>
                                <Input value="+77773643421" readOnly/>
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
                                <Input value="Түркістан облысы" readOnly/>
                            </div>
                            <div>
                                <Label>Аудан қала</Label>
                                <Input value="Бәйдібек ауданы" readOnly/>
                            </div>
                            <div>
                                <Label>Округ</Label>
                                <Input value="Ағыбет ауылдық округі" readOnly/>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </>
    )
}