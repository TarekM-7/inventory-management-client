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
        <table className="w-full border border-line bg-white table-fixed text-[18px]">
            <thead>
                <tr className="bg-cell text-left text-sm tracking-wide uppercase">
                    <th className="w-36 border-b border-line px-4 py-2">Fecha</th>
                    <th className="w-36 border-b border-line px-4 py-2">Hora</th>
                    <th className="border-b border-line px-4 py-2">Tornillo</th>
                    <th className="w-36 border-b border-line px-4 py-2">Tipo</th>
                    <th className="w-32 border-b border-line px-4 py-2 text-right">Cantidad</th>
                    <th className="border-b border-line px-4 py-2">Nota</th>
                </tr>
            </thead>
            <tbody>
                {movements.map((movement) => (
                    <tr key={movement.id}>
                        <td className="border-b border-line-soft px-4 py-2 font-mono">
                            {formatDateTime(movement.createdAt, "date")}
                        </td>
                        <td className="border-b border-line-soft px-4 py-2 font-mono">
                            {formatDateTime(movement.createdAt, "time")}
                        </td>
                        <td
                            className="truncate border-b border-line-soft px-4 py-2 font-mono font-bold"
                            title={movement.product.name}
                        >
                            {movement.product.name}
                        </td>
                        <td className="border-b border-line-soft px-4 py-2">
                            {movement.type === "out" ? (
                                <span className="bg-out rounded-sm px-4 py-1.5 text-base font-bold text-white">
                                    ↗ Salida
                                </span>
                            ) : (
                                <span className="border-2 border-in rounded-sm px-2 py-1 text-base font-bold text-in">
                                    ↙ Entrada
                                </span>
                            )}
                        </td>
                        <td className="border-b border-line-soft px-4 py-2 text-right font-mono font-bold">
                            {formatNumber(movement.quantity)}
                        </td>
                        <td
                            className="truncate border-b border-line-soft px-4 py-2 text-ink-soft"
                            title={movement.note || undefined}
                        >
                            {movement.note || "-"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
