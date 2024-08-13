import {cookies} from "next/headers";
import axios from "axios";
import {NextRequest, NextResponse} from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: number } }
) {

    try {
        const token = cookies().get('token');

        const response = await axios.get(`http://api.agroduken.kz/api/tests/${params.id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token?.value}`
            }
        });

        const data = response.data;

        return NextResponse.json(data, { status: 200 });

    } catch (error) {

        // @ts-ignore
        return NextResponse.json({ message: "Success", id: params.id }, { status: 200 });
    }
}