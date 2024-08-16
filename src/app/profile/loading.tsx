import {Loader} from "lucide-react";
import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

export default function Loading() {
    return (
        <div className="w-full h-[600px] flex justify-center items-center">
            <Loader className="animate-spin" />
        </div>
    )
}