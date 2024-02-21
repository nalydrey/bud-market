import { useNavigate, useParams } from "react-router-dom"
import { useGetDescendantsCategoriesQuery } from "../../../api/createApi"
import { CategoryModel } from "../../../models/entities/category.model"
import { SelfNestedCategory } from "../../../components/SelfNestedCategory.component"
import { CategoryContainer } from "../../../components/containers/category-container.component"



export const SelfCatalogPage = () => {

    const {categoryName} = useParams<{categoryName: string}>()
    const navigate = useNavigate()

    const {data, isSuccess} = useGetDescendantsCategoriesQuery(categoryName || '')


    const handleClick = (category: CategoryModel) => {
        navigate(category.systemName)
    }

    return (
        <CategoryContainer>
            {
                isSuccess &&
                data.category.children.map(category => (
                    <SelfNestedCategory
                        category={category}
                        onClick={handleClick}
                    />
                ))
            }
        </CategoryContainer>
    )
}