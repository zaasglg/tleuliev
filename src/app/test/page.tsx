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

export default function Page() {
    const [lang, setLang] = useState("kk");

    const { data: tests,
        error: testsError,
        isLoading: testsLoading
    } = useTests();

    const { data: user, error: userError, isLoading: userLoading} = useUser();

    return (
        <>
            <section>
                <div className="flex justify-between items-center gap-10">
                    <div>
                        <h2 className="text-4xl font-medium">Тесттер</h2>
                    </div>

                    <div className="flex items-center space-x-3">

                        {/*open search model*/}
                        <Dialog>
                            <DialogTrigger className="outline-none mr-5">
                                <Search color="gray" />
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Іздеу</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-3">
                                    <Input placeholder="Іздеу...." />
                                    <Button>
                                        Іздеу
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>

                        {/*change lang*/}
                        <ToggleGroup type="single"
                                     size="sm" value={lang}
                                     onValueChange={(value) => {
                                         if (value) setLang(value);
                                     }}>
                            <ToggleGroupItem value="kk">
                                KK
                            </ToggleGroupItem>
                            <ToggleGroupItem value="ru">
                                RU
                            </ToggleGroupItem>
                        </ToggleGroup>

                    </div>
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
            {testsLoading && <div className="h-[550px] w-full flex justify-center items-center"><span>Загрузка...</span></div>}
            {testsError && <p>Error loading tests: {testsError.message}</p>}
            <section className="mt-10 grid grid-cols-2 gap-3">
                {tests && tests.map((test) => (
                    <div key={test.id}>
                        <CardTest
                            id={test.id}
                            keyQuestion={test.key}
                            lang={test.lang}
                            question={test.question}
                        />
                    </div>
                ))}
            </section>


        </>
    )
}