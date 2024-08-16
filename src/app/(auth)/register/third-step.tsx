import React, { useState, useEffect } from 'react';
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {UserProps} from "@/utils/type";
// import {fetchDistricts, fetchRegions, fetchVillages} from "@/api/fetchRegion";
import {Districts, Regions, Villages} from "@/types/region.types";
import fetchData from "@/utils/api/fetchData";

interface Props {
    formData: UserProps,
    setFormData: (data: UserProps) => void,
}

const ThirdStep = ({ formData, setFormData }: Props) => {

    const [regions, setRegions] = useState<Regions[] | null>();
    const [districts, setDistricts] = useState<Districts[] | null>();
    const [villages, setVillages] = useState<Villages[] | null>();

    useEffect(() => {

        fetchData('regions')
            .then(res => {
                console.log(res)
                setRegions(res.data)
            })

    }, []);

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

                    fetchData(`districts/${Number(val)}`)
                        .then(res => {
                            setDistricts(res.data)
                        })
                }}>
                    <SelectTrigger className="">
                        <SelectValue placeholder="-----------------"/>
                    </SelectTrigger>
                        <SelectContent>
                            {regions && regions.map(region => (
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


                    fetchData(`villages/${Number(val)}`)
                        .then(res => {
                            setVillages(res.data)
                        })

                }}>
                    <SelectTrigger className="">
                        <SelectValue placeholder="-----------------"/>
                    </SelectTrigger>
                    <SelectContent>
                        {districts && districts.map(district => (
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
                        {villages && villages.map(village => (
                            <SelectItem value={String(village.id)} key={village.id}>{village.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </>
    );
};

export default ThirdStep;
