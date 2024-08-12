import {useMutation, useQuery} from '@tanstack/react-query';
import axios, {AxiosResponse} from 'axios';
import {ApiResponse, Districts, Regions, User, Villages} from "./type";
import {cookies} from "next/headers";

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

const registerUser = async (user: User): Promise<ApiResponse> => {
    const response = await axios.post('http://api.agroduken.kz/api/register', user);
    return response.data;
};

const loginUser = async ({phone, password}: {phone: String, password: String}): Promise<AxiosResponse<{ token: String }>> => {
    const response = await axios.post('http://api.agroduken.kz/api/login', { phone, password });
    return response;
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

export const useRegisterUser = (
    onSuccess?: (data: ApiResponse) => void,
    onError?: (error: Error) => void
) => {
    return useMutation<ApiResponse, Error, User>({
        mutationFn: registerUser,
        onSuccess,
        onError,
    });
};

export const useLoginUser = (
    onSuccess?: (data: AxiosResponse<{ token: String }>) => void,
    onError?: (error: Error) => void
) => {
    return useMutation<AxiosResponse<{ token: String }>, Error, { phone: string; password: string }>({
        mutationFn: loginUser,
            onSuccess: (data) => {
                // cookies().set('token', data.data.token.toString())

                if (onSuccess) {
                    onSuccess(data);
                }
            },
        onError,
    });
};