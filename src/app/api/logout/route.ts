import { NextResponse } from 'next/server';
import axios from 'axios';
import {cookies} from "next/headers";

export async function DELETE() {
    try {

        cookies().delete("token")

        return NextResponse.json({success: true}, {status: 200});

    } catch (error) {
        // Если возникает ошибка, возвращаем сообщение об ошибке
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
