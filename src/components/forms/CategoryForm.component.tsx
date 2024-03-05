import { useFormik } from "formik"
import { ModalWindow } from "../modal-window.component"
import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { CategorySelector } from "../CategorySelector.component"
import { CategoryModel } from "../../models/entities/category.model"
import { Button, FormControlLabel, IconButton, Switch } from "@mui/material"
import { MUITextField } from "../inputs/MUITextField.component"
import { FolderPlusIcon, PhotoIcon } from "@heroicons/react/24/outline"
import { CategoryFormModel } from "../../models/forms/category-form.model"
import { categoryFormInitData } from "../../data/initial-data/forms/category-form.init"



interface CategoryFormProps {
    initData?: CategoryFormModel | null
    name?: string
    onSubmit: (form: CategoryFormModel) => void
}

export const CategoryForm = ({
    initData,
    onSubmit
}: CategoryFormProps) => {

    const [open, setOpen] = useState<boolean>(false)
    

    const {values, handleChange, handleSubmit, setValues} = useFormik({
        initialValues: categoryFormInitData,
        onSubmit: (form) => {
            onSubmit(form)
        }
    })

    const [switchStatus, setSwitchStatus] = useState<boolean>(!values.parentId)
    const [categoryName, setCategoryName] = useState<string>('') 

    useEffect(() => {
        initData &&
        setValues(initData)
    }, [initData, setValues])

    const handleOpenModal = () => {
        setOpen(true)
    }

    const handleCloseModal = () => {
        setOpen(false)
    }

    const handleChangeCategory = (category: CategoryModel | null) => {
        category && setCategoryName(category.name)
        setValues({...values, parentId: category?.id || null})
        setOpen(false)
    }

    const handleSwitch = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        if(checked)  {
            setCategoryName('')
            setSwitchStatus(checked)  
            setValues({...values, parentId: null})
        }
        else {
           setSwitchStatus(checked) 
        }        
    }

    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null
        setValues({...values, file})
    }
     
    const fakeUrl = useMemo(()=>{
        return values.file && URL.createObjectURL(values.file)
    }, [values.file])
    
    return (
        <>
            <form 
                className="flex flex-col gap-3"
                onSubmit={handleSubmit}
            >
                <MUITextField
                    name="name"
                    label='Назва категорії'
                    value = {values.name}
                    onChange={handleChange}
                />
                <div className="flex justify-between items-center">
                    {
                    fakeUrl ?
                    <div className="max-w-[200px] rounded-lg overflow-hidden shadow-xl">
                        <img src={fakeUrl} alt="photo" />
                    </div>
                    :
                    <p>Оберіть малюнок</p>
                    }
                    <label className="border border-gray-medium self-end p-1 rounded-md shadow-lg cursor-pointer hover:text-blue-700">
                        <PhotoIcon className="w-5"/>
                        <input 
                            type="file" 
                            className="hidden" 
                            name="file" 
                            onChange={handleChangeFile}
                        />
                    </label>
                </div>
                <FormControlLabel 
                    label= {'Створити самостійну'}
                    control={<Switch 
                                checked={switchStatus} 
                                onChange={handleSwitch}/>} 
                />
              {
                !switchStatus &&
                <fieldset className="border px-2 rounded-md" >
                    <legend className="text-xs">
                        {
                            values.parentId 
                            ? 'Обрана категорія'
                            : 'Оберіть категорію в яку додати нову'
                            
                        }
                        
                        </legend>
                    <div className="p-1 flex justify-between items-center">
                        {
                            
                            values.parentId ? 
                            <span>{categoryName}</span>
                            :
                            <span>Категорія не обрана</span>
                        }
                        <IconButton 
                            className="hover:text-blue-700"
                            onClick={handleOpenModal}
                        >
                            <FolderPlusIcon className="w-5"/>
                        </IconButton>
                    </div>
                </fieldset>
          
                
              }
                <Button 
                    variant="contained"
                    type="submit"
                >
                    Відправити
                </Button>
            </form>
            <ModalWindow
                className="z-20"
                open = {open}
                onClickEmptySpace={handleCloseModal}
            >
                <CategorySelector
                    onClick={handleChangeCategory}
                />
            </ModalWindow>
        </>
    )
}