import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layuot/layout.component";
import { HomePage } from "../pages/home-page.component";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          index: true,
          element: <HomePage/>
        }
      ]
    },
  ]);