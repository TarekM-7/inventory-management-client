import { useFetcher } from "react-router"
import type { Product } from "../types"
import { useState } from "react"
import type { deleteProductAction } from "../actions/productActions"

type DeleteProductProps = {
    product: Product
}

export default function DeleteProduct({ product }: DeleteProductProps) {
    const fetcher = useFetcher<typeof deleteProductAction>()
    const [confirming, setConfirming] = useState(false)
    const isDeleting = fetcher.state !== "idle"

    return (
        <section className="mt-8 border border-line bg-white p-6">
            <h2 className="text-xl font-bold">Eliminar tornillo</h2>
            <p className="mt-1 text-ink-soft">
                Solo se puede eliminar un tornillo que todavía no tiene movimientos.
            </p>

            {fetcher.data?.error && (
                <p
                    role="alert"
                    className="mt-4 border-2 border-warning bg-warning-bg p-4 font-bold text-warning-text"
                >
                    {fetcher.data.error}
                </p>
            )}

            {confirming ? (
                <fetcher.Form
                    method="post"
                    action={`/productos/${product.id}/eliminar`}
                    className="mt-4 flex flex-wrap items-center gap-3"
                >
                    <p className="font-bold">
                        ¿Eliminar <span className="font-mono">{product.name}</span>? No se puede
                        deshacer.
                    </p>
                    <button
                        type="submit"
                        disabled={isDeleting}
                        className="h-12 cursor-pointer bg-out px-6 font-bold text-white disabled:opacity-60"
                    >
                        {isDeleting ? "Eliminando..." : "Sí, eliminar"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setConfirming(false)}
                        className="h-12 cursor-pointer border border-line px-6 font-bold"
                    >
                        No
                    </button>
                </fetcher.Form>
            ) : (
                <button
                    type="button"
                    onClick={() => setConfirming(true)}
                    className="mt-4 h-12 cursor-pointer border border-line px-6 font-bold"
                >
                    Eliminar...
                </button>
            )}
        </section>
    )
}
