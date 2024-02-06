import { useFormik } from "formik"
import { MainInput } from "../MainInput.component"
import { ChangeEvent, useEffect, useState } from "react"
import { SERVER_PATH } from "../../constants/server"
import { BrandModel } from "../../models/entities/brand.model"

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
}



export const BrandForm = ({
    editData,
    name,
    onSubmit
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
        if(e.target.files){
            const fakeUrl = URL.createObjectURL(e.target.files[0])
            setUrl(fakeUrl)
            setFieldValue(e.target.name, e.target.files[0])
        } 
    }

    console.log(values);
    
    

    return (
        <form 
            className="flex flex-col max-w-sm gap-5"
            action=""
            onSubmit={handleSubmit}
        >
            <MainInput
                name="name"
                value={values.name}
                placeholder="enter brand name"
                onChange={handleChange}
            />
            <input 
                name="logoImg"
                type="file" 
                onChange={handleChangeFile}
            />
            <img src={url} alt="" />
            <button>Sent</button>
        </form>
    )
}