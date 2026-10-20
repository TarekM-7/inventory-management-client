import { createBrowserRouter } from "react-router"
import Layout from "./layouts/Layout"
import RegisterMovement from "./views/RegisterMovement"
import Products from "./views/Products"
import History from "./views/History"
import NotFound from "./views/NotFound"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <RegisterMovement /> },
            { path: "productos", element: <Products /> },
            { path: "historial", element: <History /> },
            { path: "*", element: <NotFound /> }
        ]
    }
])
