import { useFormik } from "formik"
import { UniButton } from "../buttons/UniButton.component"
import { MUITextField } from "../inputs/MUITextField.component"
import { Rating } from "@mui/material"
import { ReviewFormModel } from "../../models/forms/review-form.model"
import { reviewFormInitData } from "../../data/initial-data/forms/review-form.init"

interface ReviewFormProps {
    onSubmit?: (form: ReviewFormModel) => void
}

export const ReviewForm = ({
    onSubmit
}: ReviewFormProps) => {

    // const [value, setValue] = useState<>

    const {values, handleChange, setValues, handleSubmit} = useFormik({
        initialValues: reviewFormInitData,
        onSubmit: (form) => {
            onSubmit && onSubmit(form)
        }
    })

    const handleChangeRating = (val: number | null) => {
        setValues({...values, rating: val})
    }

    return (
        <form 
            className="flex flex-col gap-5"
            onSubmit={handleSubmit}
        >
            <Rating
                name="rating"
                value={values.rating}
                onChange={(e, val) => handleChangeRating(val)}
            />
            <MUITextField
                name="userName"
                label="Ім'я"
                value={values.userName}
                onChange={handleChange}
            />
            <textarea
                className="bg-transparent border h-32 rounded-md p-2 border-gray-600 resize-none outline-none focus:border-blue-700 duration-200 placeholder:text-gray-600"
                name = 'text'    
                placeholder="Ваш коментар..."
                value={values.text}
                onChange={handleChange}
            ></textarea>
            <UniButton
                title="Відправити"
            />
        </form>
    )
}