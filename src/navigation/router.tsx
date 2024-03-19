import { createBrowserRouter } from "react-router-dom";
import { IndexPage } from "../pages";
import { HomePage } from "../pages/home";
import { AdminPage } from "../pages/admin";
import { BrandPage } from "../pages/admin/brands";
import { AdminHomePage } from "../pages/admin/home/index";
import { LabelsPage } from "../pages/admin/labels";
import { CategoriesPage } from "../pages/admin/categories";
import { ProductsPage } from "../pages/admin/products";
import { CatalogHomePage } from "../pages/catalog";
import { SelfCatalogPage } from "../pages/catalog/level_one/SelfCatalogPage.component";
import { RootCatalogPage } from "../pages/catalog/level_one/root-catalog.component";
import { SingleProductPage } from "../pages/product/single-product-page";
import { BasketPage } from "../pages/basket";
import { OrderPage } from "../pages/order";
import { AdminOrderPage } from "../pages/admin/orders";
import { AdminUsersPage } from "../pages/admin/users";
import { AdminFavoritePage } from "../pages/admin/favorite";
import { ComparePage } from "../pages/compare";
import { UserPage } from "../pages/user";
import { UserOrderPage } from "../pages/user/orders";
import { FavoritePage } from "../pages/favorites";
import { TestPage } from "../pages/TestPage";
import { ThankPage } from "../pages/thank";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <IndexPage/>,
      children: [
        {
          index: true,
          element: <HomePage/>
        },
        {
          path: '/basket',
          element: <BasketPage/>
        },
        {
          path: '/thank',
          element: <ThankPage/>
        },
        {
          path: '/user',
          element: <UserPage/>,
          children: [
            {
              path: 'orders',
              element: <UserOrderPage/>
            }
          ]
        },
        {
          path: '/favorites',
          element: <FavoritePage/>
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
            {
              path: 'orders',
              element: <AdminOrderPage/>
            },
            {
              path: 'users',
              element: <AdminUsersPage/>
            },
            {
              path: 'favorite',
              element: <AdminFavoritePage/>
            },
          ]
        },
        {
          path: '/order',
          element: <OrderPage/>
        },
        {
          path: '/compare',
          element: <ComparePage/>
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
        {
          path: '/product/:productId',
          element: <SingleProductPage/>
        }
        // {
        //   path: '/catalog/:categoryName',
        //   element: <SelfCatalogPage/>
        // }
      ]
    },
  ]);

  export const testRouter = createBrowserRouter([
  {
    path: '/',
    element: <TestPage/>
  }
]) 