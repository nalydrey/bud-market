import { useParams, useNavigate, Outlet } from "react-router-dom"

import { useMemo } from "react"
import { useGetAncestorsCategoriesQuery } from "../../api/categoryApi"

interface BreadCrumbsModel {
    name: string
    path: string
}


const breadcrumbs: BreadCrumbsModel[] = [
    {
        name: 'Головна',
        path: '/'
    },
    {
        name: 'каталог',
        path: 'catalog'
    }
]

export const CatalogHomePage = () => {

    const {categoryName} = useParams<{categoryName: string}>()
    const {data: ancestors, isSuccess: isSuccessAncestors} = useGetAncestorsCategoriesQuery(categoryName || '')
    const navigate = useNavigate()

    const transformBreadcrumbs = useMemo<BreadCrumbsModel[]>(() => {
        let ancestorsArr: BreadCrumbsModel[] = []
        if(isSuccessAncestors){
            ancestorsArr  = ancestors.map(item => ({
                name: item.name,
                path: item.systemName
            }))
        }
        const arr = [...breadcrumbs, ...ancestorsArr]
        return arr.map((item, i) => {
            if(breadcrumbs.length !== (i+1)) return item
            return {
                name: item.name,
                path: ''
            }
        })
    }, [ancestors, isSuccessAncestors])

    const currentCategory = useMemo(()=>{
        return isSuccessAncestors 
        ? ancestors.find((item, i) => ancestors.length === i+1)
        : null
    }, [ancestors, isSuccessAncestors])
    

    const handleClickBreadcrumb = (breadcrumb: BreadCrumbsModel) => {
        navigate(breadcrumb.path)
    }

    return (
        <div className="container mx-auto pt-3 pb-5 flex flex-col gap-10 ">
            <Outlet/>
        </div>
    )
}