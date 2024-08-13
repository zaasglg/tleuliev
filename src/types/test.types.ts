export interface Test {
    id: number;
    key: string;
    question: string;
    lang: string;
    answers: Answer[];
}
export interface Answer {
    id: number;
    test_id: number;
    answer: number;
    correct: boolean;
}