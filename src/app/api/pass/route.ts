import axios from "axios";
import {NextResponse} from "next/server";
import {cookies} from "next/headers";


export async function GET(req: Request) {
    try {
        const token = cookies().get('token');

        const response = await axios.get('http://api.agroduken.kz/api/passeds/my', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token?.value}`
            }
        });

        const data = response.data;

        // Return the data as JSON response
        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        // @ts-ignore
        return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
    }
}


export async function POST(req: Request) {
    try {

        const token = cookies().get('token');
        const { user_id, test_id, answer_id } = await req.json();

        const response = await axios.post('http://api.agroduken.kz/api/passeds', {
            user_id, test_id, answer_id
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token?.value}`
            }
        });

        const data = response.data;

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        // Если возникает ошибка, возвращаем сообщение об ошибке

        // @ts-ignore
        return NextResponse.json({ error: "Internal server error", message: error.message }, { status: 500 });
    }
}
