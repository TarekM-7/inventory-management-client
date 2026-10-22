import { useLoaderData } from "react-router"
import MovementsTable from "../components/MovementsTable"
import type { historyLoader } from "../loaders/historyLoader"
import { formatNumber } from "../utils"
import Pagination from "../components/Pagination"

export default function History() {
    const { movements } = useLoaderData<typeof historyLoader>()
    const { page, total, totalPages } = movements.meta

    function pageUrl(newPage: number) {
        return `?pagina=${newPage}`
    }

    return (
        <section>
            <div className="mb-5">
                <h1 className="text-3xl font-bold">Historial de movimientos</h1>
                <p className="mt-1 text-ink-soft">
                    {formatNumber(total)} movimientos · del más reciente al más antiguo
                </p>
            </div>

            <MovementsTable movements={movements.data} />
            <Pagination page={page} totalPages={totalPages} pageUrl={pageUrl} />
        </section>
    )
}
