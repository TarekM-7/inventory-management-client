import { Link } from "react-router"

type PaginationProps = {
    page: number
    totalPages: number
    pageUrl: (page: number) => string
}

export default function Pagination({ page, totalPages, pageUrl }: PaginationProps) {
    if (totalPages <= 1) {
        return null
    }

    const linkClass = "flex h-12 items-center border border-line bg-white px-5 font-bold"
    const disabledClass = "flex h-12 items-center border border-line-soft px-5 font-bold text-line"

    return (
        <nav aria-label="Páginas" className="mt-5 flex items-center justify-between">
            <p className="text-ink-soft">
                Página {page} de {totalPages}
            </p>
            <div className="flex gap-3">
                {page > 1 ? (
                    <Link to={pageUrl(page - 1)} className={linkClass}>
                        ← Anterior
                    </Link>
                ) : (
                    <span className={disabledClass}>← Anterior</span>
                )}
                {page < totalPages ? (
                    <Link to={pageUrl(page + 1)} className={linkClass}>
                        Siguiente →
                    </Link>
                ) : (
                    <span className={disabledClass}>Siguiente →</span>
                )}
            </div>
        </nav>
    )
}
