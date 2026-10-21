import { createBrowserRouter } from "react-router"
import Layout from "./layouts/Layout"
import RegisterMovement from "./views/RegisterMovement"
import Products from "./views/Products"
import History from "./views/History"
import NotFound from "./views/NotFound"
import { getProductById, getProducts } from "./services/ProductService"
import RouteError from "./components/RouteError"
import Loading from "./components/Loading"
import NewProduct from "./views/NewProduct"
import { editProductAction, newProductAction } from "./actions/productActions"
import EditProduct from "./views/EditProduct"

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
            {
                path: "productos/nuevo",
                element: <NewProduct />,
                action: newProductAction,
                errorElement: <RouteError />
            },
            {
                path: "productos/:id/editar",
                element: <EditProduct />,
                loader: ({ params }) => getProductById(Number(params.id)),
                action: editProductAction,
                errorElement: <RouteError />
            },
            { path: "historial", element: <History /> },
            { path: "*", element: <NotFound /> }
        ]
    }
])
