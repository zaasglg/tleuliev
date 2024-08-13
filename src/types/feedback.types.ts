export interface Feedback {
    id: number;
    user: {
        id: number;
        name: string;
        phone: number;
        email: string;
    };
    title: string;
    message: string;
}

