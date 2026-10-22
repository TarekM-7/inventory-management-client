import { getLatestMovements } from "../services/MovementService"
import { getProducts } from "../services/ProductService"

export async function registerMovementLoader() {
    const [products, movements] = await Promise.all([getProducts(), getLatestMovements()])
    return { products, movements }
}
