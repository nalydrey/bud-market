import { useFormik } from "formik"
import { MainInput } from "../MainInput.component"
import { ChangeEvent, useEffect, useState } from "react"
import { SERVER_PATH } from "../../constants/server"
import { BrandModel } from "../../models/entities/brand.model"
import { FileDashedButton } from "../file-dashed-button.component"
import { FormButton } from "../FormButton.componet"

export interface IBrandForm {
    name: string
    logoImg: File | null
}

 const initialValues: IBrandForm = {
    name: '',
    logoImg: null
}

interface BrandFormProps {
    editData?: BrandModel | null
    name?: string
    onSubmit: (form: IBrandForm) => void
    onClose?: (name: string) => void
}



export const BrandForm = ({
    editData,
    onSubmit,
}: BrandFormProps) => {

    const [url, setUrl] = useState<string>('')

    const {values, handleChange, handleSubmit, setFieldValue} = useFormik({
        initialValues,
        onSubmit: (form) => {
            onSubmit(form)
        }
    })


    useEffect(() => {
        if(editData){
            setFieldValue('name', editData.name)
            setUrl(`${SERVER_PATH}/${editData.logoImg}`)
        }
    }, [editData, setFieldValue])


    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('!');
        
        if(e.target.files){
            const fakeUrl = URL.createObjectURL(e.target.files[0])
            setUrl(fakeUrl)
            setFieldValue(e.target.name, e.target.files[0])
        } 
    }

    return (
       
            <form 
                className="flex flex-col max-w-sm gap-5"
                action=""
                onSubmit={handleSubmit}
            >
                <MainInput
                    name="name"
                    title="Назва бренду"
                    value={values.name}
                    onChange={handleChange}
                />
                <FileDashedButton
                    title="Додати логотип"
                    url={url}
                    onChange={handleChangeFile}
                />
                <FormButton
                    title="Зберегти"
                />
            </form>
    )
}