import {
    array,
    maxLength,
    nonEmpty,
    number,
    object,
    pipe,
    string,
    toUpperCase,
    trim,
    type InferOutput
} from "valibot"

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

export const ProductInputSchema = object({
    name: pipe(
        string(),
        trim(),
        nonEmpty("Escribe el nombre."),
        maxLength(100, "El nombre puede tener hasta 100 caracteres.")
    ),
    code: pipe(
        string(),
        trim(),
        toUpperCase(),
        nonEmpty("Escribe el código."),
        maxLength(100, "El código puede tener hasta 100 caracteres.")
    )
})

export type ProductInput = InferOutput<typeof ProductInputSchema>
