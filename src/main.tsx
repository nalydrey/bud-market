import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { router } from "./navigation/router.tsx";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
