import {ChangeEvent, useState} from "react";
import { FormKey, FormModificationEvent, FormRecord } from "../../lib";

export type TextInputType = "password" | "text";

interface Props{
    label: string;
    key: FormKey;
    form: FormRecord;
    onValueChange: FormModificationEvent;
    type?: TextInputType;
}

export function TextInput({label, key, form, onValueChange, type}: Props) {
    const [inputType, setInputType] = useState<TextInputType>(type ?? "text")
    
    const handleInputChange = ({target: input}: ChangeEvent<HTMLInputElement>) => onValueChange(key, input.value)
    
    return <div>
        <label>{label}</label>
        <input type={inputType} value={form[key]} onChange={handleInputChange}/>
    </div>;
}