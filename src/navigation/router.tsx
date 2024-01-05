import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layuot/layout.component";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
      
      ]
    },
  ]);