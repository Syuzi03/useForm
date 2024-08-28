import { useState } from "react"

export interface FormValues {
    [key: string]: string
}
interface IValidation {
    required?: string
}
interface IValidations {
    [key: string]: IValidation
}
export const useForm = () => {
    const [values, setValues] = useState<FormValues>({})
    const [errors, setErrors] = useState<FormValues>({})
    const rules: IValidations = {}

    const handleSubmit = (callback: (values: FormValues) => void) => (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const temp: FormValues = { ...errors }
        for (const key in rules) {
            if (rules[key].required && (!values[key] || !values[key].trim())) {
                temp[key] = rules[key].required as string
            } else {
                delete temp[key]
            }
        }

        setErrors(temp)

        if (Object.keys(temp).length == 0) {
            callback(values)
        }
    }

    const register = (key: string, options: IValidation = {}): { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void } => {
        rules[key] = options
        return {
            value: values[key] || '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValues({ ...values, [key]: e.target.value })
        }
    }

    return { handleSubmit, register, errors }
}