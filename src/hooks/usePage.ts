import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useGetAncestorsCategoriesQuery } from "../api/categoryApi"

interface BreadcrumbsDataModel {
    name: string
    path: string
}

const predefinedBreadcrumbs: BreadcrumbsDataModel[] = [
    {
        name: 'головна',
        path: '/'
    },
    {
        name: 'каталог',
        path: '/catalog'
    },
    {
        name: 'кошик',
        path: '/basket'
    },
    {
        name: 'порівняння',
        path: '/compare'
    },
    {
        name: 'панель адміністратора',
        path: '/admin'
    },
] 

export const usePage = () => {

    const location = useLocation()
    const {categoryName} = useParams<{categoryName: string}>()

    const {data: ancestors, isSuccess: isSuccessAncestors} = useGetAncestorsCategoriesQuery(categoryName || '')

    const {breadcrumbs, pageName} = useMemo(() => {
        console.log('!!!!!!!!!!!!!!!!!!!!!');
        console.log(ancestors);
        
        const breadcrumbs: BreadcrumbsDataModel[] = []
        const arr = location.pathname.split('/')
        console.log(location.pathname);
        const set = new Set(arr)
        console.log(set);
        console.log(set.size);
        if(set.size > 1){
            Array.from(set).forEach(item => {
                const matchItem = predefinedBreadcrumbs.find(elem => elem.path === `/${item}`)
                if(matchItem){
                    breadcrumbs.push(matchItem)
                }
            })
    
            const basePath = breadcrumbs.find((item, i) => (i === breadcrumbs.length - 1))?.path
    
            if(ancestors){
                ancestors.forEach(item => breadcrumbs.push({name: item.name, path: basePath + '/' +item.systemName}))
            }
        }
        return {
            breadcrumbs, 
            pageName: breadcrumbs.find((item, i) => i === breadcrumbs.length-1 )?.name
        }
    }, [location.pathname, ancestors])
    
    console.log(breadcrumbs);
    

    return {
        breadcrumbs,
        pageName
    }
} 