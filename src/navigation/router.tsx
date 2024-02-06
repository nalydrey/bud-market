import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layuot/layout.component";
import { HomePage } from "../pages/home-page.component";
import { AdminPage } from "../pages/admin-page.component";
import { BrandPage } from "../pages/brand-page";
import { AdminHomePage } from "../pages/admin-home-page";
import { LabelsPage } from "../pages/labels-page.component";
import { CategoriesPage } from "../pages/categories-page.component";

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
            }
          ]
        }
      ]
    },
  ]);