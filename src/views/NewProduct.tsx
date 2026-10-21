import { useActionData } from "react-router"
import type { newProductAction } from "../actions/productActions"
import ProductForm from "../components/ProductForm"

export default function NewProduct() {
    const actionData = useActionData<typeof newProductAction>()

    return (
        <section className="max-w-2xl">
            <h1 className="text-3xl font-bold">Nuevo Tornillo</h1>
            <p className="mt-1 mb-5 text-ink-soft">
                La existencia empieza en 0. Para sumar piezas, registra una entrada.
            </p>
            <ProductForm errors={actionData?.errors} submitLabel="Guardar tornillo" />
        </section>
    )
}
