import ProductForm from "../components/ProductForm"

export default function NewProduct() {
    return (
        <section className="max-w-2xl">
            <h1 className="text-3xl font-bold">Nuevo Tornillo</h1>
            <p className="mt-1 mb-5 text-ink-soft">
                La existencia empieza en 0. Para sumar piezas, registra una entrada.
            </p>
            <ProductForm submitLabel="Guardar tornillo" />
        </section>
    )
}
