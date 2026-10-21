import { parse } from "valibot"
import { ProductResponseSchema, ProductsResponseSchema, type ProductInput } from "../types"
import { api } from "./api"

export async function getProducts() {
    const { data } = await api.get("/api/products", { params: { limit: 100 } })
    return parse(ProductsResponseSchema, data).data
}

export async function createProduct(product: ProductInput) {
    await api.post("/api/products", product)
}

export async function getProductById(id: number) {
    const { data } = await api.get(`/api/products/${id}`)
    return parse(ProductResponseSchema, data).data
}

export async function updateProduct(id: number, product: ProductInput) {
    await api.put(`/api/products/${id}`, product)
}
