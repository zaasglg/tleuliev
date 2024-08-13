import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        const token = cookies().get('token');

        const response = await axios.get('http://api.agroduken.kz/api/user', {
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
