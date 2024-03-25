import { useEffect, useMemo, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { BreadcrumbsDataModel } from "../models/breadcrumb.model"
import { useGetAncestorsCategoriesQuery } from "../api/categoryApi"
import { skipToken } from "@reduxjs/toolkit/query"
import { useGetProductQuery } from "../api/productApi"





const predefinedBreadcrumbs: BreadcrumbsDataModel[] = [
    {
        title: 'головна',
        name: '',
        path: '/',
    },
    {
        title: 'кошик',
        name: 'basket',
        path: '/basket',
    },
    {
        title: 'каталог',
        name: 'catalog',
        path: '/catalog',
    },
    {
        title: 'контакти',
        name: 'contacts',
        path: '/contacts',
    },
    {
        title: 'про компанію',
        name: 'about',
        path: '/about',
    },
    {
        title: 'розпродаж',
        name: 'sale',
        path: '/sale',
    },
    {
        title: 'новинки',
        name: 'new',
        path: '/new',
    },
    {
        title: 'хіти продажу',
        name: 'popular',
        path: '/popular',
    },
]

    

export const usePage = () => {
    
    const [category, setCategory] = useState<string | null>(null)    
    const [currentBreadcrumbs, setSurrentBreadcrumbs] = useState<BreadcrumbsDataModel[]>([])

    const {pathname} = useLocation()
    const {categoryName, productId} = useParams<{categoryName?: string, productId?: string}>()
    
    

    const {data: ancestors} = useGetAncestorsCategoriesQuery(category ?? skipToken)
    const {data: product} = useGetProductQuery(productId || '')
  
console.log(product);

    useEffect(() => {
        if(product) setCategory(product.category.systemName)
        if(!product) setCategory(categoryName || null)
    }, [product, categoryName])
    

    useEffect(() => {

        const newBreadcrumbs: BreadcrumbsDataModel[] = []

        const pathSet = new Set(pathname.split('/'))
        pathSet.forEach(item => {
            const singleBreadcrumb = predefinedBreadcrumbs.find(elem => elem.name === item)
            if(singleBreadcrumb) newBreadcrumbs.push(singleBreadcrumb)
        })

       console.log(ancestors);
       

        category && ancestors && ancestors.forEach(elem => {

            newBreadcrumbs.push({
                name: elem.systemName,
                path: `/catalog/${elem.systemName}`,
                title: elem.name
            })
        })
console.log(product);

        product && newBreadcrumbs.push({title: product.title, name:product.title, path: `/product/${product.id}`})
        
        setSurrentBreadcrumbs(newBreadcrumbs)
     
    }, [pathname, ancestors, product, category])
   
    const currentName: string = useMemo(() => {
        const lastItem = currentBreadcrumbs.find((item, i) => i === currentBreadcrumbs.length-1 )
        return lastItem?.title || ''
    }, [currentBreadcrumbs])


  return {
    breadcrumbs: currentBreadcrumbs,
    currentPath: pathname,
    currentName
  }
} 