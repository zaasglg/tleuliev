"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {X} from "lucide-react";
import {Switch} from "@/components/ui/switch";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

export default function Page() {

    const [answers, setAnswers] = useState([
        { id: 1, value: "", correct: false }
    ])

    return (
        <>
            <section>
                <div className="flex justify-between items-center gap-10">
                    <div>
                        <h2 className="text-4xl font-medium">Тесттер</h2>
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
            <section className="mt-10">
                <Card className="">
                    <CardHeader>
                        <CardTitle className="text-xl font-medium">Тест қосу</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="question">Cұрақ</Label>
                                    <Input id="question" />
                                </div>
                            </div>

                            <h2 className="mt-5 mb-1">Жауаптар</h2>
                            <div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#ID</TableHead>
                                            <TableHead>Жауап</TableHead>
                                            <TableHead>Дұрыс/Бұрыс</TableHead>
                                            <TableHead>Әрекет</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {answers.map(answer => (
                                            <TableRow key={answer.id}>
                                                <TableCell>{answer.id}</TableCell>
                                                <TableCell>
                                                    <Input
                                                        type="text"
                                                        value={answer.value}
                                                        onChange={(event) => {
                                                            setAnswers(answers.map(input =>
                                                                input.id === answer.id
                                                                    ? { ...input, value: event.target.value } // Correct syntax for updating value
                                                                    : input
                                                            ));
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Switch />
                                                </TableCell>
                                                <TableCell>
                                                    <Button type="button" disabled={answers.length === 1} variant="ghost" className="w-9 h-9 p-0 text-red-500 hover:text-red-600" onClick={() => {
                                                        setAnswers(answers.filter(old => old.id !== answer.id))
                                                    }}>
                                                        <X />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex space-x-3">
                        <Button variant="outline" onClick={() => {
                            setAnswers([...answers, { id: answers[answers.length - 1].id + 1, value: '', correct: false }])
                        }}>Жауап қосу</Button>
                        <Button>Сақтау</Button>
                    </CardFooter>
                </Card>
            </section>


        </>
    )
}