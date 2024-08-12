"use client"

import {useState} from "react";
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

const tests = [
    {
        id: 1,
        key: 'Э11',
        question: 'Эпизоотология дегеніміз -',
    },
    {
        id: 2,
        key: 'Э13',
        question: 'Эпизоотология ғылым ретінде нені зерттейді?',
    },
    {
        id: 3,
        key: 'Э14',
        question: 'Жеке жұқпалы аурулардың эпизоотологиялық сипаттамасы мен көріну ерекшеліктерін зерттейді? ',
    },
    {
        id: 4,
        key: 'Э15',
        question: 'Инфекция дегеніміз не?',
    },
]


export default function Page() {
    const [lang, setLang] = useState("kk");

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

            <section className="gap-3 items-stretch mt-10 space-y-3">
                {tests.map((test) => (
                    <div key={test.id}>
                        <CardTest id={test.id} keyQuestion={test.key} question={test.question}/>
                    </div>
                ))}
            </section>


        </>
    )
}