import { useFormik } from "formik"
import { ModalWindow } from "../modal-window.component"
import { CategorySelector } from "../CategorySelector.component"
import { useModal } from "../../hooks/useModal"
import { CategoryModel } from "../../models/entities/category.model"
import { ChangeEvent, useState } from "react"
import { MainInput } from "../inputs/MainInput.component"
import { CardControl } from "../card-control.component"
import { useGetBrandsQuery } from "../../api/brandApi"
import { useGetLabelsQuery } from "../../api/labelApi"
import { ProductFormModel } from "../../models/forms/product-form.model"
import { productFormInitData } from "../../data/initial-data/forms/product-form.init"
import { characteristicFormInitData } from "../../data/initial-data/forms/characteristic-form.init"
import { MUITextField } from "../inputs/MUITextField.component"
import { Button, SelectChangeEvent } from "@mui/material"
import { Fieldset } from "../fieldset.component"
import { Selector } from "../select.component"
import { BrandMenuItem } from "../menu-items/brand-menu-item.component"
import { LabelMenuItem } from "../menu-items/label-menu-item.component"
import { statuses } from "../../data/product-statuses.data"
import { StatusMenuItem } from "../menu-items/status-menu-item.component"



interface ProductFormProps {
    name: string
    onSubmit: (form: ProductFormModel) => void
}

export const ProductForm = ({
    onSubmit
}: ProductFormProps) => {

    const {data: brands, isSuccess: isSuccessBrands} = useGetBrandsQuery({})
    const {data: labels, isSuccess: isSuccessLabels} = useGetLabelsQuery(undefined)

    const [changedCategory, setChangedCategory] = useState<CategoryModel | null>()
    const {open, close, status} = useModal()

    const {values, handleChange, handleSubmit, setFieldValue} = useFormik({
        initialValues: productFormInitData,
        onSubmit: (form) => {
            onSubmit({...form, labelId: form.labelId && +form.labelId, brandId: form.brandId && +form.brandId})
        }
    })

    const handleCharacteristicChange = (name: string, value: string, index: number) => {
        setFieldValue(`characteristics.${index}.${name}`, value)
    }

    const handleAddItem = () => {
        setFieldValue('characteristics', [characteristicFormInitData, ...values.characteristics])
    }

    const handleChangeCategory = (category: CategoryModel | null) => {
        close()
        category &&
        setFieldValue('categoryId', category.id)
        setChangedCategory(category)
    }

    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        files &&
        setFieldValue('images', files)
    }

    const handleDeleteProperty = (index: number) => {
        const filterCharacteristics = values.characteristics.filter((characteristic, i) => i !==index)
        setFieldValue('characteristics', filterCharacteristics)
    }

    const handleSelect = (e: SelectChangeEvent<number | string | null>) => {
        const value = e.target.value ? e.target.value : null
        setFieldValue(e.target.name, value)
    }

    return (
        <>
        <form 
            className="flex flex-col gap-2"
            onSubmit={handleSubmit}
        >
            <MUITextField
                name='title'
                label='Заголовок'
                value={values.title}
                onChange= {handleChange}
            />
            
            <MUITextField
                name="name" 
                label='Назва товару'
                value={values.name}
                onChange= {handleChange}
            />
           
            <MUITextField
                name="model" 
                label='Модель'
                value={values.model}
                onChange= {handleChange}
            />
          
            <MUITextField 
                name="discription" 
                label="Опис"
                value={values.discription}
                onChange= {handleChange}
            />
            <MUITextField 
                name="price" 
                label="Ціна"
                value={values.price}
                onChange= {handleChange}
            />

            <Selector
                id="brand"
                name="brandId"
                label="Бренд"
                value={values.brandId ? values.brandId : ''}
                onChange={handleSelect}
            >
                {
                    isSuccessBrands && 
                    brands.map(brand => (
                        <BrandMenuItem key={brand.id} brand={brand} value={brand.id}/>
                     ))
                }
            </Selector>

            <Selector
                id="label"
                name="labelId"
                label="Лейба"
                value={values.labelId}
                onChange={handleSelect}
            >
                {
                    isSuccessLabels && 
                    labels.map(label => (
                        <LabelMenuItem key={label.id} label={label} value={label.id}/>
                    ))
                }
            </Selector>
            
            <Selector
                id="status"
                name="status"
                label="Cтатус продукту"
                value={values.status}
                onChange={handleSelect}
            >
                {
                    statuses.map(status => (
                        <StatusMenuItem key={status.systemName} status={status} value={status.systemName}/>
                    ))
                }
            </Selector>

            <Fieldset
                defaultLegend="Оберіть категорію"
                alternativeLegend="Обрана категорія"
                defaultText="Категорія не обрана"
                alternativeText={changedCategory?.name}
                alterCondition={!!changedCategory}
                onClick={open}
            />
            
                
            {
                values.characteristics.map((item, index) => (
                    <div className="relative flex gap-3">
                        <MainInput 
                            type="text" 
                            name='name'
                            title="Назва"
                            value={item.name}
                            onChange={(e) => handleCharacteristicChange(e.target.name, e.target.value, index)}
                        />
                        <MainInput 
                            type="text" 
                            name='value'
                            title="Значення"
                            value={item.value}
                            onChange={(e) => handleCharacteristicChange(e.target.name, e.target.value, index)}
                        />
                        <MainInput 
                            type="text" 
                            name='unit'
                            title="Одиниці"
                            value={item.unit}
                            onChange={(e) => handleCharacteristicChange(e.target.name, e.target.value, index)}
                        />
                       <CardControl
                            className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/2"
                            onDelete={() => handleDeleteProperty(index)}

                       />
                    </div>    
                ))
            }
        
            <input type="file" multiple onChange={handleChangeFile}/>
            <button type="button" onClick={handleAddItem}>Додати властивість</button>
            <Button 
                variant="contained"
                type="submit"
            >
                Відправити
            </Button>
        </form>
        <ModalWindow
                className="z-10"
                open = {status}
                onClickEmptySpace={close}
        >
            
            <CategorySelector
                onClick={handleChangeCategory}
            />
        </ModalWindow>
        </>
    )
}