
import React, { useState, useEffect, ChangeEvent } from 'react';
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const Place = () => {


    return (
        <>
            <div className="space-y-1">
                <Label>
                    Облыс
                </Label>
                <Select>
                    <SelectTrigger className="">
                        <SelectValue placeholder="-----------------"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-1">
                <Label>
                    Аудан қала
                </Label>
                <Select>
                    <SelectTrigger className="">
                        <SelectValue placeholder="-----------------"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-1">
                <Label>
                    Округ
                </Label>
                <Select>
                    <SelectTrigger className="">
                        <SelectValue placeholder="-----------------"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </>
    );
};

export default Place;
