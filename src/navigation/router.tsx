import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layuot/layout.component";
import { HomePage } from "../pages/home-page.component";
import { AdminPage } from "../pages/admin-page.component";
import { BrandPage } from "../pages/brand-page";
import { AdminHomePage } from "../pages/admin-home-page";
import { LabelsPage } from "../pages/labels-page.component";
import { CategoriesPage } from "../pages/categories-page.component";
import { ProductsPage } from "../pages/admin/products-page.component";
import { CatalogHomePage } from "../pages/catalog/catalog-index.component";
import { SelfCatalogPage } from "../pages/catalog/level_one/SelfCatalogPage.component";
import { RootCatalogPage } from "../pages/catalog/level_one/root-catalog.component";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          index: true,
          element: <HomePage/>
        },
        {
          path: '/admin',
          element: <AdminPage/>,
          children: [
            {
              index: true ,
              element: <AdminHomePage/> 
            },
            {
              path: 'brands',
              element: <BrandPage/>
            },
            {
              path: 'labels',
              element: <LabelsPage/>
            },
            {
              path: 'categories',
              element: <CategoriesPage/>
            },
            {
              path: 'products',
              element: <ProductsPage/>
            },
          ]
        },
        {
          path: '/catalog',
          element: <CatalogHomePage/>,
          children: [
            {
              index: true,
              element: <RootCatalogPage/>
            },
            {
              path: ':categoryName',
              element: <SelfCatalogPage/>
            },
          ]
        },
        // {
        //   path: '/catalog/:categoryName',
        //   element: <SelfCatalogPage/>
        // }
      ]
    },
  ]);