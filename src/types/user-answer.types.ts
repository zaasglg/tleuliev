export interface UserAnswer {
    id: number;
    user: {
        id: number;
        name: string;
        phone: number;
        email: string;
    };
    region: {
        id: number;
        name: string;
    };
    district: {
        id: number;
        name: string;
    };
    village: {
        id: number;
        name: string;
    };
    test: {
        id: number;
        key: string;
        question: string;
        lang: string;
    };
    answer: {
        id: number;
        answer: string;
        correct: number; // Use boolean if needed
    };
}

