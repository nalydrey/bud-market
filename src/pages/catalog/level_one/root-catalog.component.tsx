import { useNavigate } from "react-router-dom"
import { useGetTreeCategoriesQuery } from "../../../api/createApi"
import { SelfNestedCategory } from "../../../components/SelfNestedCategory.component"
import { CategoryContainer } from "../../../components/containers/category-container.component"
import { CategoryModel } from "../../../models/entities/category.model"


export const RootCatalogPage = () => {

    const navigate = useNavigate()
    const {data, isSuccess} = useGetTreeCategoriesQuery(undefined)

    const handleClick = (category: CategoryModel) => {
        navigate(category.systemName)
    }

    return (
        <CategoryContainer>
            {
                isSuccess &&
                data.categories.map(category => (
                    <SelfNestedCategory
                        category={category}
                        onClick={handleClick}
                    />
                ))
            }
        </CategoryContainer>
    )
}