import type { LoaderFunctionArgs } from "react-router"
import { getMovements, getProductMovements } from "../services/MovementService"
import { getProducts } from "../services/ProductService"

export async function historyLoader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get("pagina")) || 1
    const productId = Number(url.searchParams.get("tornillo"))

    const products = await getProducts()
    const product = products.find((item) => item.id === productId)
    const movements = product ? await getProductMovements(product, page) : await getMovements(page)

    return { products, product, movements }
}
