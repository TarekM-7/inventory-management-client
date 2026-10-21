import { flatten, safeParse } from "valibot"
import { ProductInputSchema } from "../types"
import { redirect, type ActionFunctionArgs } from "react-router"
import { createProduct } from "../services/ProductService"

async function readProductForm(request: Request) {
    const formData = Object.fromEntries(await request.formData())
    return safeParse(ProductInputSchema, formData)
}

export async function newProductAction({ request }: ActionFunctionArgs) {
    const result = await readProductForm(request)
    if (!result.success) {
        return { errors: flatten(result.issues).nested }
    }

    await createProduct(result.output)
    return redirect("/productos")
}
