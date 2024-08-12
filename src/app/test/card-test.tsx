import {ArrowRight} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function CardTest({ id, keyQuestion, question }: {
    id: number
    keyQuestion: string
    question: string
}) {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="font-medium text-base">{question}</CardTitle>
                <CardDescription>#{keyQuestion}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button className="uppercase space-x-3" asChild>
                    <Link href={`/test/${id}`}>
                        <span>Тапсыру</span>
                        <ArrowRight size={14}/>
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}