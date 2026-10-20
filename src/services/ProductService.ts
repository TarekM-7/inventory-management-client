import { parse } from "valibot"
import { ProductsResponseSchema } from "../types"
import { api } from "./api"

export async function getProducts() {
    const { data } = await api.get("/api/products", { params: { limit: 100 } })
    return parse(ProductsResponseSchema, data).data
}
