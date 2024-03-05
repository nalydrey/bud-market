import { useState } from "react"
import { UniButton } from "../../components/buttons/UniButton.component"
import { ModalWindow } from "../../components/modal-window.component"
import { ReviewForm, ReviewFormModel } from "../../components/forms/ReviewForm.component"
import { FormContainer } from "../../components/form-container.component"
import { useCreateReviewMutation } from "../../api/reviewApi"
import { useParams } from "react-router-dom"


export const ReviewPage = () => {

    const {productId} = useParams<{productId: string}>()
    const [open, setOpen] = useState<boolean>(false)

    const [createReview] = useCreateReviewMutation()
    

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = (form: ReviewFormModel) => {
        if(productId){
            createReview({...form, productId: +productId,  value: form.rating})
        }
    }

    return (
        <div className="py-10">
            <div className="flex justify-center">
                <UniButton
                    title="Залишити відгук"
                    onClick={handleOpen}
                />
            </div>
            <ModalWindow
                open = {open}  
            >
                <FormContainer
                    onClose={() => handleClose()}
                >
                    <ReviewForm
                        onSubmit={handleSubmit}
                    />
                </FormContainer>
            </ModalWindow>
        </div>
    )
}