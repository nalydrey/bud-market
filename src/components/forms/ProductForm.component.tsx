import { useFormik } from "formik"
import { useGetBrandsQuery, useGetLabelsQuery } from "../../api/createApi"
import { ModalWindow } from "../modal-window.component"
import { CategorySelector } from "../CategorySelector.component"
import { useModal } from "../../hooks/useModal"
import { CategoryModel } from "../../models/entities/category.model"
import { ChangeEvent } from "react"
import { MainInput } from "../MainInput.component"
import { CardControl } from "../card-control.component"


export interface ProductFormData {
    title: string
    name: string
    model: string
    discription: string
    status: string
    categoryId: number | null
    labelId: number | null
    brandId: number | null
    price: number | undefined
    images: FileList | null
    characteristics: CharacteristicFormData[]
}

interface CharacteristicFormData {
    name: string
    value: string
    unit: string
}

const initCharacteristic = {
    name: '',
    value: '',
    unit: ''
}

const initialValues: ProductFormData = {
    title: '',
    name: '',
    model: '',
    discription: '',
    status: '',
    categoryId: null,
    labelId: null,
    brandId: null,
    price: undefined,
    images: null,
    characteristics: []
}

interface ProductFormProps {
    name: string
    onSubmit: (form: ProductFormData) => void
}

export const ProductForm = ({
    onSubmit
}: ProductFormProps) => {

    const {data: brands, isSuccess: isSuccessBrands} = useGetBrandsQuery(undefined)
    const {data: labels, isSuccess: isSuccessLabels} = useGetLabelsQuery(undefined)

    const {open, close, status} = useModal()

    const {values, handleChange, handleSubmit, setFieldValue} = useFormik({
        initialValues,
        onSubmit: (form) => {
            
            onSubmit({...form, labelId: form.labelId && +form.labelId, brandId: form.brandId && +form.brandId})
        }
    })

    const handleCharacteristicChange = (name: string, value: string, index: number) => {
        setFieldValue(`characteristics.${index}.${name}`, value)
    }

    const handleAddItem = () => {
        setFieldValue('characteristics', [initCharacteristic, ...values.characteristics])
    }

    const handleChangeCategory = (category: CategoryModel | null) => {
        close()
        category &&
        setFieldValue('categoryId', category.id)
    }

    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        files &&
        setFieldValue('images', files)
    }

    const handleDeleteProperty = (index: number) => {
        const filterCharacteristics = values.characteristics.filter((characteristic, i) => i !==index)
        console.log(filterCharacteristics);
        
        setFieldValue('characteristics', filterCharacteristics)
    }

    return (
        <>
        <form 
            className="flex flex-col gap-2"
            onSubmit={handleSubmit}
        >
            <MainInput
                name='title'
                title='Заголовок'
                value={values.title}
                onChange= {handleChange}
            />
            
            <MainInput
                name="name" 
                title='Назва товару'
                value={values.name}
                onChange= {handleChange}
            />
           
            <MainInput
                name="model" 
                title='Модель'
                value={values.model}
                onChange= {handleChange}
            />
          
            <MainInput 
                type="text" 
                name="discription" 
                title="Опис"
                value={values.discription}
                onChange= {handleChange}
            />
            <MainInput 
                type="number" 
                name="price" 
                title="Ціна"
                value={values.price}
                onChange= {handleChange}
            />
            <select name="brandId" 
                onChange={handleChange}
            >
                {
                    isSuccessBrands && brands.brands.map(brand => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))
                }
            </select>
            
            <select name="labelId" 
                onChange={handleChange}
            >
                {
                    isSuccessLabels && labels.labels.map(label => (
                        <option key={label.id} value={label.id}>{label.name}</option>
                    ))
                }
            </select>
            <select name="status" 
                onChange={handleChange}
            >
                <option value={'exist'}>в наявності</option>
                <option value={'order'}>на замовлення</option>
                <option value={'none'}>немає у наявності</option>
            </select>
                <button type="button" onClick={handleAddItem}>Додати властивість</button>
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
        <button type="button" onClick={open}>Обрати категорію</button>
            <input type="file" multiple onChange={handleChangeFile}/>
           
            <button type="submit">Submit</button>
        </form>
        <ModalWindow
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