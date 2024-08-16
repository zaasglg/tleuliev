import { Test } from "./test.types";
import { User } from "./user.types";

export interface Task {
    id: number;
    redactor: User;
    user: User;
    test: Test
}