import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import React, {ChangeEvent} from "react";
import {UserProps} from "@/utils/type";

interface Props {
    formData: UserProps,
    setFormData: (data: UserProps) => void
}

export default function SecondStep({ formData, setFormData }: Props) {

    return (
        <>
            <div>
                <Label htmlFor="phone">
                    Телефон номер
                </Label>
                <div className="mt-1">
                    <Input id="phone"
                           type="text"
                           name="phone"
                           value={formData.phone}
                           onChange={(event) => {
                               setFormData({
                                   ...formData,
                                   phone: event.target.value,
                               })
                           }}
                    />
                    {
                        formData.errors.phone
                            ? <p className="text-xs text-red-500 mt-1">{formData.errors.phone}</p>
                            : null
                    }
                </div>
            </div>


            <div className="space-y-1">
                <Label htmlFor="profession">
                    Мамандық
                </Label>
                <div className="mt-1">
                    <Input id="profession"
                           type="text"
                           name="profession"
                           value={formData.profession}
                           onChange={(event) => {
                               setFormData({
                                   ...formData,
                                   profession: event.target.value,
                               })
                           }}/>
                    {
                        formData.errors.profession
                            ? <p className="text-xs text-red-500 mt-1">{formData.errors.profession}</p>
                            : null
                    }
                </div>
            </div>

            <div className="space-y-1">
                <Label htmlFor="birthday">
                    Туылған күні
                </Label>
                <div className="mt-1">
                    <Input id="birthday"
                           type="date"
                           name="birthday"
                           value={formData.birthday}
                           onChange={(event) => {
                               setFormData({
                                   ...formData,
                                   birthday: event.target.value,
                               })
                           }}
                    />
                    {
                        formData.errors.birthday
                            ? <p className="text-xs text-red-500 mt-1">{formData.errors.birthday}</p>
                            : null
                    }
                </div>
            </div>
        </>
    )
}