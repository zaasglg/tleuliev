import {ArrowRight} from "lucide-react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";

export default function CardTest({ id, keyQuestion, question, lang }: {
    id: number
    keyQuestion: string
    question: string,
    lang: string
}) {
    return (
        <Card className="h-full flex flex-col justify-between">
            <CardHeader>
                <CardTitle className="space-x-2">
                    <Badge className="border border-gray-300 bg-transparent text-gray-800 font-normal hover:bg-sky-100">
                        #{keyQuestion}
                    </Badge>
                    <Badge className="border border-gray-300 bg-transparent text-gray-800 font-normal hover:bg-sky-100">
                        {lang}
                    </Badge>
                </CardTitle>
                <CardDescription>{question}</CardDescription>
            </CardHeader>
            <CardContent className="">
                <Button className="uppercase space-x-3 hover:bg-blue-500 hover:text-white" variant="outline" asChild>
                    <Link href={`/test/${id}`}>
                        <span>Тапсыру</span>
                        <ArrowRight size={14}/>
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}