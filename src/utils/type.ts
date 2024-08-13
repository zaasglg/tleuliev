import exp from "node:constants";

export interface UserProps {
    role: string,
    name: string,
    email: string,
    phone: string,
    profession: string,
    birthday: string,
    region: number,
    district: number,
    village: number,
    password: string,
    passwordC: string,
    errors: {
        role?: string;
        name?: string;
        email?: string;
        phone?: string;
        profession?: string;
        birthday?: string;
        region?: string;
        district?: string;
        village?: string;
        password?: string;
        passwordC?: string;
    };
}

export interface ApiResponse {
    message: string;
}