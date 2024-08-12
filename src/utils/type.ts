import exp from "node:constants";

interface StepperProps {
    step: number;
    setStep: (step: number | ((step: number) => number)) => void;
}

interface CardTestProps {
    id: number
    key: String
    question: String
}

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

export interface Regions {
    id: number;
    name: string;
}

export  interface Districts {
    id: number,
    name: string,
    region: Regions
}

export interface Villages {
    id: number,
    name: string,
    region: Districts
}

export interface User {
    name: string;
    email: string;
    password: string;
    phone: string;
    birthday: string;
    region_id: number;
    district_id: number;
    village_id: number;
    role: string;
}


export interface ApiResponse {
    message: string;
}
