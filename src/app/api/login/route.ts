import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
    try {
        const { phone, password } = await req.json();

        const response = await axios.post('http://api.agroduken.kz/api/login', {
            phone,
            password
        });

        const token = response.data.token;

        // Создаем ответ и устанавливаем куки
        const res = NextResponse.json({ token }, { status: 200 });
        res.cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        return res;

    } catch (error) {
        // Если возникает ошибка, возвращаем сообщение об ошибке
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
