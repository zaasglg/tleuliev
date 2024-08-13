export interface Result {
    id: number;
    user: {
        id: number;
        name: string;
        phone: number;
        email: string;
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

