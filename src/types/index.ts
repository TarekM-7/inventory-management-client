import {
    array,
    maxLength,
    nonEmpty,
    nullable,
    number,
    object,
    picklist,
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

export const ProductResponseSchema = object({
    data: ProductSchema
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

export const MovementSchema = object({
    id: number(),
    type: picklist(["in", "out"]),
    quantity: number(),
    note: nullable(string()),
    createdAt: string(),
    product: object({
        id: number(),
        name: string(),
        code: string()
    })
})

export const MovementsResponseSchema = object({
    data: array(MovementSchema),
    meta: PaginationSchema
})

export type Movement = InferOutput<typeof MovementSchema>
