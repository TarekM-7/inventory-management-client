import { createBrowserRouter } from "react-router"
import Layout from "./layouts/Layout"
import RegisterMovement from "./views/RegisterMovement"
import Products from "./views/Products"
import History from "./views/History"
import NotFound from "./views/NotFound"
import { getProducts } from "./services/ProductService"
import RouteError from "./components/RouteError"
import Loading from "./components/Loading"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        hydrateFallbackElement: <Loading />,
        children: [
            { index: true, element: <RegisterMovement /> },
            {
                path: "productos",
                element: <Products />,
                loader: getProducts,
                errorElement: <RouteError />
            },
            { path: "historial", element: <History /> },
            { path: "*", element: <NotFound /> }
        ]
    }
])
