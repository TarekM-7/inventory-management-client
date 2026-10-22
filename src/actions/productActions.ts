import { flatten, safeParse } from "valibot"
import { ProductInputSchema } from "../types"
import { redirect, type ActionFunctionArgs } from "react-router"
import { createProduct, deleteProduct, updateProduct } from "../services/ProductService"
import { isAxiosError } from "axios"

async function readProductForm(request: Request) {
    const formData = Object.fromEntries(await request.formData())
    return safeParse(ProductInputSchema, formData)
}

function duplicateCodeErrors(error: unknown) {
    if (isAxiosError(error) && error.response?.status === 409) {
        return { errors: { code: ["Ya existe un tornillo con ese código."] } }
    }
    throw error
}

export async function newProductAction({ request }: ActionFunctionArgs) {
    const result = await readProductForm(request)
    if (!result.success) {
        return { errors: flatten(result.issues).nested }
    }

    try {
        await createProduct(result.output)
    } catch (error) {
        return duplicateCodeErrors(error)
    }
    return redirect("/productos")
}

export async function editProductAction({ request, params }: ActionFunctionArgs) {
    const result = await readProductForm(request)
    if (!result.success) {
        return { errors: flatten(result.issues).nested }
    }

    try {
        await updateProduct(Number(params.id), result.output)
    } catch (error) {
        return duplicateCodeErrors(error)
    }
    return redirect("/productos")
}

export async function deleteProductAction({ params }: ActionFunctionArgs) {
    try {
        await deleteProduct(Number(params.id))
    } catch (error) {
        if (isAxiosError(error) && error.response?.status === 409) {
            return { error: "No se puede eliminar: este tornillo ya tiene movimientos." }
        }
        throw error
    }

    return redirect("/productos")
}
