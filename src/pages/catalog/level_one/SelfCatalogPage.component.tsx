import { useNavigate, useParams } from "react-router-dom"
import { CategoryModel } from "../../../models/entities/category.model"
import { SelfNestedCategory } from "../../../components/SelfNestedCategory.component"
import { CategoryContainer } from "../../../components/containers/category-container.component"
import { FilterPage } from "./filter-page.component"
import { useGetDescendantsCategoriesQuery } from "../../../api/categoryApi"



export const SelfCatalogPage = () => {

    const {categoryName} = useParams<{categoryName: string}>()
    const navigate = useNavigate()

    const {data: category, isSuccess} = useGetDescendantsCategoriesQuery(categoryName || '')


    const handleClick = (category: CategoryModel) => {
        navigate(`../${category.systemName}`)
    }

    return (
        <>
            {
                isSuccess && category.children.length ?
                <CategoryContainer>
                    {
                        isSuccess &&
                        category.children.map(category => (
                            <SelfNestedCategory
                                category={category}
                                onClick={handleClick}
                            />
                        ))
                    }
                </CategoryContainer>
                :
                <FilterPage/>
            }
        </>
    )
}