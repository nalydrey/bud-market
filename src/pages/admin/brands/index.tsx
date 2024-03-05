import { BrandCard } from "../../../components/cards/brand-card.component";
import { SERVER_PATH } from "../../../constants/server";
import { ModalProvider } from "../../../components/modal-provider.component";
import { BrandForm, IBrandForm } from "../../../components/forms/BrandForm.component";
import { useState } from "react";
import { BrandModel } from "../../../models/entities/brand.model";
import { useDeleteBrandMutation, useEditBrandMutation, useGetBrandsQuery } from "../../../api/brandApi";


export const BrandPage = () => {

    const {data: brands, isSuccess} = useGetBrandsQuery({})
    const [deleteBrand] = useDeleteBrandMutation()
    const [editBrand] = useEditBrandMutation()
    
    const handleDelete = (id: number) => {
        deleteBrand(id)
    }

    const [openState, setOpenState] = useState<string[]>([])
    const [selectedBrand, setSelectedBrand] = useState<BrandModel | null>(null)

    const handleOpenModal = (name: string, brand: BrandModel) => {
        const set = new Set([...openState, name])
        setOpenState(Array.from(set))
        setSelectedBrand(brand)

    }

    const handleCloseModal = (name: string) => {
        const set = new Set(openState)
        set.delete(name)
        setOpenState(Array.from(set))
    }

    const handleSubmitBrandForm = (form: IBrandForm) => {
        console.log(form);
        
        if(selectedBrand){
            const formData = new FormData()
            formData.append('name', form.name)
            form.logoImg && formData.append('file', form.logoImg)
            editBrand({id: selectedBrand.id, body: formData})
        }
    
    }

    return (
        <div className="grid grid-cols-4 gap-5 gap-y-10">
            {
                isSuccess &&
                brands.map((brand) => (
                    <BrandCard
                        key={brand.id}
                        src={SERVER_PATH + brand.logoImg}
                        onDelete={() => handleDelete(brand.id)}
                        onEdit={() => handleOpenModal('brands', brand)}
                    />
                ))
            }
            <ModalProvider
                openedList = {openState}
                onClose={handleCloseModal}
            >
                <BrandForm
                    editData={selectedBrand}
                    name="brands"
                    onSubmit={handleSubmitBrandForm}
                />
            </ModalProvider>
        </div>
    )
}