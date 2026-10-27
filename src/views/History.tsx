import { Form, useLoaderData } from "react-router"
import MovementsTable from "../components/MovementsTable"
import Pagination from "../components/Pagination"
import type { historyLoader } from "../loaders/historyLoader"
import { formatNumber } from "../utils"

export default function History() {
    const { products, product, movements } = useLoaderData<typeof historyLoader>()
    const { page, total, totalPages } = movements.meta

    function pageUrl(newPage: number) {
        const params = new URLSearchParams()
        if (product) {
            params.set("tornillo", String(product.id))
        }
        params.set("pagina", String(newPage))
        return `?${params}`
    }

    return (
        <section>
            <div className="mb-5 flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Historial de movimientos</h1>
                    <p className="mt-1 text-ink-soft">
                        {formatNumber(total)} movimientos
                        {product && (
                            <>
                                {" "}
                                de <span className="font-mono font-bold">{product.name}</span>
                            </>
                        )}{" "}
                        · del más reciente al más antiguo
                    </p>
                </div>

                <Form method="get" className="flex items-end gap-3">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="tornillo" className="font-bold">
                            Tornillo
                        </label>
                        <select
                            key={product?.id ?? "todos"}
                            id="tornillo"
                            name="tornillo"
                            defaultValue={product?.id ?? ""}
                            className="h-13 w-90 rounded-sm border-2 border-line bg-white px-3 font-mono text-lg"
                        >
                            <option value="">Todos los tornillos</option>
                            {products.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="h-13 cursor-pointer rounded-sm bg-out px-6 font-bold text-white"
                    >
                        Filtrar
                    </button>
                </Form>
            </div>

            <MovementsTable movements={movements.data} />
            <Pagination page={page} totalPages={totalPages} pageUrl={pageUrl} />
        </section>
    )
}
