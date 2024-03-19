import { useNavigate } from "react-router-dom"
import { SelfNestedCategory } from "../../../components/SelfNestedCategory.component"
import { CategoryContainer } from "../../../components/containers/category-container.component"
import { CategoryModel } from "../../../models/entities/category.model"
import { useGetTreeCategoriesQuery } from "../../../api/categoryApi"


export const RootCatalogPage = () => {

    const navigate = useNavigate()
    const {data: categories, isSuccess} = useGetTreeCategoriesQuery(undefined)

    const handleClick = (category: CategoryModel) => {
        navigate(category.systemName)
    }

    

    return (
        <CategoryContainer>
            {
                isSuccess &&
                categories.map(category => (
                    <SelfNestedCategory
                        category={category}
                        onClick={handleClick}
                    />
                ))
            }
        </CategoryContainer>
    )
}