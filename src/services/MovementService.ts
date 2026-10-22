import { parse } from "valibot"
import { api } from "./api"
import {
    MovementsResponseSchema,
    ProductMovementsResponseSchema,
    type MovementInput,
    type Product
} from "../types"

export async function getLatestMovements() {
    const { data } = await api.get("/api/movements", { params: { limit: 8 } })
    return parse(MovementsResponseSchema, data).data
}

export async function createMovement({ productId, type, quantity, note }: MovementInput) {
    await api.post(`/api/products/${productId}/movements`, {
        type,
        quantity,
        note: note || undefined
    })
}

export async function getMovements(page: number) {
    const { data } = await api.get("/api/movements", { params: { page, limit: 20 } })
    return parse(MovementsResponseSchema, data)
}

export async function getProductMovements(product: Product, page: number) {
    const { data } = await api.get(`/api/products/${product.id}/movements`, {
        params: { page, limit: 20 }
    })
    const result = parse(ProductMovementsResponseSchema, data)
    return {
        data: result.data.map((movement) => ({ ...movement, product })),
        meta: result.meta
    }
}
