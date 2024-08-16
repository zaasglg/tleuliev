"use server"

import axios from "axios";
import { cookies } from "next/headers";

export default async function fetchGet(url: string) {
    try {
        const token = cookies().get("token");

        const response = await axios.get(`http://api.agroduken.kz/api/${url}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token?.value}`
            }
        });

        const data = response.data

        return { data, status: 200 };

    } catch (error) {
        return { message: "Internal server error", status: 500 };
    }
}
