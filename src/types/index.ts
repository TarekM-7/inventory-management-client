import {
    array,
    integer,
    maxLength,
    maxValue,
    minValue,
    nonEmpty,
    nullable,
    number,
    object,
    picklist,
    pipe,
    string,
    toUpperCase,
    transform,
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

export const MovementInputSchema = object({
    productId: pipe(string(), transform(Number), integer()),
    type: picklist(["in", "out"]),
    quantity: pipe(
        string(),
        trim(),
        nonEmpty("Escribe la cantidad."),
        transform(Number),
        integer("Escribe un número entero, sin decimales."),
        minValue(1, "La cantidad debe ser mayor a 0."),
        maxValue(999999, "La cantidad puede ser hasta 999,999.")
    ),
    note: pipe(string(), trim(), maxLength(255, "La nota puede tener hasta 255 caracteres."))
})

export type MovementInput = InferOutput<typeof MovementInputSchema>
