import { useFormik } from "formik"
import { ChangeEvent, useEffect, useState } from "react"
import { SERVER_PATH } from "../../constants/server"
import { BrandModel } from "../../models/entities/brand.model"
import { FileDashedButton } from "../file-dashed-button.component"
import { BrandFormModel } from "../../models/forms/brand-form.model"
import { brandFormInitData } from "../../data/initial-data/forms/brand-form.init"
import { MUITextField } from "../inputs/MUITextField.component"
import { Button } from "@mui/material"


interface BrandFormProps {
    editData?: BrandModel | null
    name?: string
    onSubmit: (form: BrandFormModel) => void
    onClose?: (name: string) => void
}

export const BrandForm = ({
    editData,
    onSubmit,
}: BrandFormProps) => {

    const [url, setUrl] = useState<string>('')

    const {values, handleChange, handleSubmit, setFieldValue} = useFormik({
        initialValues: brandFormInitData,
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
                <MUITextField
                    name="name"
                    label="Назва бренду"
                    value={values.name}
                    onChange={handleChange}
                />
                <FileDashedButton
                    title="Додати логотип"
                    url={url}
                    onChange={handleChangeFile}
                />
                <Button 
                    variant="contained"
                    type="submit"
                >
                    Відправити
                </Button>
            </form>
    )
}