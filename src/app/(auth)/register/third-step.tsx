import React, { useState, useEffect, ChangeEvent } from 'react';
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useQuery} from "@tanstack/react-query";
import {useDistricts, useRegions, useVillages} from "@/utils/api-requests";
import {UserProps} from "@/utils/type";
// import apiRequests from '@/utils/api-requests'

interface Props {
    formData: UserProps,
    setFormData: (data: UserProps) => void,
}

const ThirdStep = ({ formData, setFormData }: Props) => {

    const { data: regions,
        error: regionsError,
        isLoading: regionsLoading
    } = useRegions();

    const {
        data: districts,
        error: districtsError,
        isLoading: districtsLoading
    } = useDistricts(formData.region)

    const {
        data: villages,
        error: villagesError,
        isLoading: villagesLoading
    } = useVillages(formData.district)

    return (
        <>
            <div className="space-y-1">
                <Label>
                    Облыс
                </Label>
                <Select onValueChange={(val) => {
                    setFormData({
                        ...formData,
                        region: Number(val)
                    })
                }}>
                    <SelectTrigger className="">
                        <SelectValue placeholder="-----------------"/>
                    </SelectTrigger>
                        <SelectContent>
                            {regions?.map(region => (
                                <SelectItem value={String(region.id)}
                                            key={region.id}>{region.name}</SelectItem>
                            ))}
                        </SelectContent>
                </Select>
            </div>

            <div className="space-y-1">
                <Label>
                    Аудан қала
                </Label>
                <Select onValueChange={(val) => {
                    setFormData({
                        ...formData,
                        district: Number(val)
                    })
                }}>
                    <SelectTrigger className="">
                        <SelectValue placeholder="-----------------"/>
                    </SelectTrigger>
                    <SelectContent>
                        {districts?.map(district => (
                            <SelectItem value={String(district.id)} key={district.id}>{district.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-1">
                <Label>
                    Округ
                </Label>
                <Select onValueChange={(val) => {
                    setFormData({
                        ...formData,
                        village: Number(val)
                    })
                }}>
                    <SelectTrigger className="">
                        <SelectValue placeholder="-----------------"/>
                    </SelectTrigger>
                    <SelectContent>
                        {villages?.map(village => (
                            <SelectItem value={String(village.id)} key={village.id}>{village.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </>
    );
};

export default ThirdStep;
