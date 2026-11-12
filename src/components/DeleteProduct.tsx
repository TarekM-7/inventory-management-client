import { useFetcher } from "react-router"
import type { Product } from "../types"
import { useState } from "react"
import type { deleteProductAction } from "../actions/productActions"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"

type DeleteProductProps = {
    product: Product
}

export default function DeleteProduct({ product }: DeleteProductProps) {
    const fetcher = useFetcher<typeof deleteProductAction>()
    const [confirming, setConfirming] = useState(false)
    const isDeleting = fetcher.state !== "idle"
    const cannotDelete = Boolean(fetcher.data?.error)

    return (
        <section className="mt-8 border border-line bg-white p-6">
            <h2 className="text-xl font-bold">Eliminar tornillo</h2>
            <p className="mt-1 text-ink-soft">
                Solo se puede eliminar un tornillo que todavía no tiene movimientos.
            </p>

            {fetcher.data?.error && (
                <p
                    role="alert"
                    className="mt-4 flex items-center justify-center gap-2 rounded-sm border-2 border-warning bg-warning-bg p-4 text-center font-bold text-warning-text"
                >
                    <ExclamationTriangleIcon
                        className="size-5 shrink-0 text-warning"
                        strokeWidth={2.5}
                    />
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
                        disabled={isDeleting || cannotDelete}
                        className={`h-12 cursor-pointer rounded-sm bg-out px-6 font-bold text-white disabled:opacity-60 ${
                            isDeleting ? "disabled:cursor-wait" : "disabled:cursor-not-allowed"
                        }`}
                    >
                        {isDeleting ? "Eliminando..." : "Sí, eliminar"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setConfirming(false)}
                        disabled={isDeleting}
                        className="h-12 cursor-pointer rounded-sm border border-line px-6 font-bold disabled:cursor-wait disabled:opacity-60"
                    >
                        No
                    </button>
                </fetcher.Form>
            ) : (
                <button
                    type="button"
                    onClick={() => setConfirming(true)}
                    disabled={cannotDelete}
                    className="mt-4 h-12 cursor-pointer rounded-sm border border-line px-6 font-bold disabled:cursor-not-allowed disabled:opacity-60"
                >
                    Eliminar...
                </button>
            )}
        </section>
    )
}
