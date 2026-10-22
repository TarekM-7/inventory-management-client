import { Link, useLoaderData } from "react-router"
import type { registerMovementLoader } from "../loaders/registerMovementLoader"
import { useState } from "react"
import ProductPicker from "../components/ProductPicker"
import MovementForm from "../components/MovementForm"

export default function RegisterMovement() {
    const { products } = useLoaderData<typeof registerMovementLoader>()
    const [selectedId, setSelectedId] = useState(products[0]?.id)
    const selected = products.find((product) => product.id === selectedId)

    if (products.length === 0) {
        return (
            <p className="border border-line bg-white p-6 text-lg">
                Todavía no hay tornillos. Primero da de alta uno en{" "}
                <Link to="/productos/nuevo" className="font-bold text-in underline">
                    Nuevo tornillo
                </Link>
                .
            </p>
        )
    }

    return (
        <div className="grid grid-cols-[minmax(0,1fr)_640px] items-start gap-8">
            <div className="flex flex-col gap-8">
                <section>
                    <h2 className="mb-3 text-sm font-bold tracking-wide text-ink-soft uppercase">
                        1 · Elige el tornillo
                    </h2>
                    <ProductPicker
                        products={products}
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                    />
                </section>
            </div>

            <section className="border border-line bg-white p-6">
                <h2 className="mb-5 text-sm font-bold tracking-wide text-ink-soft uppercase">
                    2 · Registra el movimiento
                </h2>
                {selected && <MovementForm product={selected} />}
            </section>
        </div>
    )
}
