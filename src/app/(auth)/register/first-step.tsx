import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import React from "react";
import {UserProps} from "@/utils/type";


interface Props {
    formData: UserProps,
    setFormData: (data: UserProps) => void
}

export default function FirstStep ({formData, setFormData}: Props) {
    return (
        <>
            <div>
                <Label htmlFor="name">
                    Аты жөні (Куәліктегідей)
                </Label>
                <div className="mt-1">
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                name: event.target.value,
                            });
                        }}
                    />
                    {
                        formData.errors.name
                            ? <p className="text-xs text-red-500 mt-1">{formData.errors.name}</p>
                            : null
                    }
                </div>
            </div>

            <div>
                <Label htmlFor="email">
                    Почта
                </Label>
                <div className="mt-1">
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                email: event.target.value,
                            });
                        }}
                    />

                    {
                        formData.errors.email
                            ? <p className="text-xs text-red-500 mt-1">{formData.errors.email}</p>
                            : null
                    }

                </div>
            </div>

            <div>
                <Label>Рөлі</Label>
                <ToggleGroup type="single" value={formData.role} className="justify-start mt-1"
                             onValueChange={(value) => {
                                 if (formData.role) setFormData({
                                     ...formData,
                                     role: value,
                                 });
                             }}>
                    <ToggleGroupItem value="redactor" aria-label="Toggle bold">
                        Тексеруші
                    </ToggleGroupItem>
                    <ToggleGroupItem value="user">
                        Тапсырушы
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
        </>
    )
}