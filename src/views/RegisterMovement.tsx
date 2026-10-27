import { Link, useLoaderData } from "react-router"
import type { registerMovementLoader } from "../loaders/registerMovementLoader"
import { useState } from "react"
import ProductPicker from "../components/ProductPicker"
import MovementForm from "../components/MovementForm"
import MovementsTable from "../components/MovementsTable"

export default function RegisterMovement() {
    const { products, movements } = useLoaderData<typeof registerMovementLoader>()
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
        <div className="grid grid-cols-[minmax(0,1fr)_550px] items-start gap-8">
            <div className="flex flex-col gap-8">
                <section>
                    <h2 className="border border-b-0 border-line bg-cell py-2.5 px-4.5 text-[15px] font-bold tracking-wider text-ink uppercase">
                        1 · Elige el tornillo
                    </h2>
                    <ProductPicker
                        products={products}
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                    />
                </section>
                <section>
                    <h2 className="border border-b-0 border-line bg-cell py-2.5 px-4.5 text-[15px] font-bold tracking-wider text-ink uppercase">
                        Últimos movimientos
                    </h2>
                    <MovementsTable movements={movements} />
                </section>
            </div>
            <section>
                <h2 className="border border-b-0 border-line bg-cell py-2.5 px-4.5 text-[15px] font-bold tracking-wider text-ink uppercase">
                    2 · Registra el movimiento
                </h2>
                <div className="border border-line bg-white p-6">
                    {selected && <MovementForm product={selected} />}
                </div>
            </section>
        </div>
    )
}
