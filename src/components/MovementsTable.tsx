import type { Movement } from "../types"
import { formatDateTime, formatNumber } from "../utils"

type MovementsTableProps = {
    movements: Movement[]
}

export default function MovementsTable({ movements }: MovementsTableProps) {
    if (movements.length === 0) {
        return (
            <p className="border border-line bg-white p-6 text-lg">
                Todavía no hay movimientos registrados.
            </p>
        )
    }

    return (
        <table className="w-full border border-line bg-white">
            <thead>
                <tr className="bg-cell text-left text-sm tracking-wide uppercase">
                    <th className="border-b border-line px-4 py-2">Fecha</th>
                    <th className="border-b border-line px-4 py-2">Tornillo</th>
                    <th className="border-b border-line px-4 py-2">Tipo</th>
                    <th className="border-b border-line px-4 py-2 text-right">Cantidad</th>
                    <th className="border-b border-line px-4 py-2">Nota</th>
                </tr>
            </thead>
            <tbody>
                {movements.map((movement) => (
                    <tr key={movement.id}>
                        <td className="border-b border-line-soft px-4 py-2 font-mono">
                            {formatDateTime(movement.createdAt)}
                        </td>
                        <td className="border-b border-line-soft px-4 py-2 font-mono font-bold">
                            {movement.product.name}
                        </td>
                        <td className="border-b border-line-soft px-4 py-2">
                            {movement.type === "out" ? (
                                <span className="bg-out px-2 py-0.5 text-sm font-bold text-white">
                                    ↗ Salida
                                </span>
                            ) : (
                                <span className="border-2 border-in px-2 text-sm font-bold text-in">
                                    ↙ Entrada
                                </span>
                            )}
                        </td>
                        <td className="border-b border-line-soft px-4 py-2 text-right font-mono font-bold">
                            {formatNumber(movement.quantity)}
                        </td>
                        <td className="border-b border-line-soft px-4 py-2 text-ink-soft">
                            {movement.note || "-"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
