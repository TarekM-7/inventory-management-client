import { array, number, object, string, type InferOutput } from "valibot"

export const ProductSchema = object({
    id: number(),
    name: string(),
    code: string(),
    stock: number()
})

export const PaginationSchema = object({
    page: number(),
    limit: number(),
    total: number(),
    totalPages: number()
})

export const ProductsResponseSchema = object({
    data: array(ProductSchema),
    meta: PaginationSchema
})

export type Product = InferOutput<typeof ProductSchema>
