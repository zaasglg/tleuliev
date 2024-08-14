import {useMutation, useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {Test} from "../types/test.types";
import {User} from "../types/user.types";
import {Districts, Regions, Villages} from "../types/region.types";
import {Result} from "../types/result.types";
import {Feedback} from "../types/feedback.types";
import {ApiResponse, UserProps} from "./type";

// fetches
const fetchRegions = async (): Promise<Regions[]> => {
    const { data } = await axios.get<Regions[]>('http://api.agroduken.kz/api/regions');
    return data;
};


const fetchDistricts = async (id: number): Promise<Districts[]> => {
    const { data } = await axios.get<Districts[]>(`http://api.agroduken.kz/api/districts/${id}`);
    return data;
};

const fetchVillages = async (id: number): Promise<Villages[]> => {
    const { data } = await axios.get<Villages[]>(`http://api.agroduken.kz/api/villages/${id}`);
    return data;
};

const fetchTests = async (): Promise<Test[]> => {
    const { data } = await axios.get<Test[]>('http://185.146.1.39:3000/api/tests');
    return data;
};

const fetchTest = async (id: number): Promise<Test> => {
    const { data } = await axios.get<Test>(`http://185.146.1.39:3000/api/tests/${id}`);
    return data;
};

const fetchUser = async (): Promise<User> => {
    const { data } = await axios.get<User>('http://185.146.1.39:3000/api/user');
    return data;
};

const fetchResults = async (): Promise<Result[]> => {
    const { data } = await axios.get<Result[]>('http://185.146.1.39:3000/api/pass');
    return data;
};

const fetchFeedbacks = async (): Promise<Feedback[]> => {
    const { data } = await axios.get<Feedback[]>('/api/feedback');
    return data;
};

const registerUser = async (user: UserProps): Promise<ApiResponse> => {
    const response = await axios.post('http://api.agroduken.kz/api/register', user);
    return response.data;
};

// react query
export const useRegions = () => {
    return useQuery<Regions[]>({
        queryKey: ['regions'],
        queryFn: fetchRegions,
    });
};

export const useDistricts = (id: number) => {
    return useQuery<Districts[]>({
        queryKey: ['districts', id],
        queryFn: () => fetchDistricts(id),
    });
};

export const useVillages = (id: number) => {
    return useQuery<Villages[]>({
        queryKey: ['villages', id],
        queryFn: () => fetchVillages(id),
    });
};

export const useTests = () => {
    return useQuery<Test[]>({
        queryKey: ['tests'],
        queryFn: fetchTests,
    });
};

export const useTest = (id: number) => {
    return useQuery<Test>({
        queryKey: ['test', id],
        queryFn: () => fetchTest(id),
    });
};

export const useUser = () => {
    return useQuery<User>({
        queryKey: ['user'],
        queryFn: fetchUser,
    });
};

export const useResult = () => {
    return useQuery<Result[]>({
        queryKey: ['result'],
        queryFn: fetchResults,
    });
};

export const useFeedback = () => {
    return useQuery<Feedback[]>({
        queryKey: ['feedback'],
        queryFn: fetchFeedbacks,
    });
};


export const useRegisterUser = (
    onSuccess?: (data: ApiResponse) => void,
    onError?: (error: Error) => void
) => {
    return useMutation<ApiResponse, Error, UserProps>({
        mutationFn: registerUser,
        onSuccess,
        onError,
    });
};