import { useActionData, useLoaderData } from "react-router"
import type { getProductById } from "../services/ProductService"
import type { editProductAction } from "../actions/productActions"
import { formatNumber } from "../utils"
import ProductForm from "../components/ProductForm"

export default function EditProduct() {
    const product = useLoaderData<typeof getProductById>()
    const actionData = useActionData<typeof editProductAction>()

    return (
        <section className="max-w-2xl">
            <h1 className="text-3xl font-bold">Editar tornillo</h1>
            <p className="mt-1 mb-5 text-ink-soft">
                Existencia: {formatNumber(product.stock)} pzas. Solo cambia con entradas y salidas.
            </p>
            <ProductForm
                product={product}
                errors={actionData?.errors}
                submitLabel="Guardar cambios"
            />
        </section>
    )
}
