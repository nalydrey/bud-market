import { useParams, useNavigate, Outlet } from "react-router-dom"
import { useGetAncestorsCategoriesQuery } from "../../api/createApi"
import { PageLabel } from "../../components/page-label.component"
import { Breadcrumbs } from "@mui/material"
import { useMemo } from "react"

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
            ancestorsArr  = ancestors.categories.map(item => ({
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
        ? ancestors.categories.find((item, i) => ancestors.categories.length === i+1)
        : null
    }, [ancestors, isSuccessAncestors])
    

    const handleClickBreadcrumb = (breadcrumb: BreadCrumbsModel) => {
        navigate(breadcrumb.path)
    }

    return (
        <div className="container mx-auto pt-3 pb-5 flex flex-col gap-10 ">
            <Breadcrumbs 
                separator="/"
            >
                {
                    transformBreadcrumbs.map(breadcrumb => (
                        <button
                            className=""
                            onClick={() => handleClickBreadcrumb(breadcrumb)}
                        >{breadcrumb.name}</button>
                    ))
                }
            </Breadcrumbs>
            <PageLabel
                title={currentCategory ? currentCategory.name : 'каталог'}
            />
            <Outlet/>
        </div>
    )
}