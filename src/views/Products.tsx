import { Link, useLoaderData } from "react-router"
import { formatNumber } from "../utils"
import { getProducts } from "../services/ProductService"

export default function Products() {
    const products = useLoaderData<typeof getProducts>()
    const totalStock = products.reduce((total, product) => total + product.stock, 0)

    return (
        <section>
            <div className="mb-5 flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Productos</h1>
                    <p className="mt-1 text-ink-soft">
                        {products.length} tornillos · {formatNumber(totalStock)} pzas en existencia
                    </p>
                </div>
                <Link
                    to="/productos/nuevo"
                    className="flex h-13 items-center rounded-sm bg-out px-5.5 text-lg font-bold text-white"
                >
                    + Nuevo Tornillo
                </Link>
            </div>

            {products.length === 0 ? (
                <p className="border border-line bg-white p-6 text-lg">
                    Todavía no hay tornillos registrados.
                </p>
            ) : (
                <table className="w-full border border-line bg-white text-lg table-fixed">
                    <thead>
                        <tr className="bg-cell text-left text-sm tracking-wide uppercase">
                            <th className="w-[27%] border-b border-line px-4.5 py-2">
                                Nombre (Odoo)
                            </th>
                            <th className="w-[22%] border-b border-line px-4.5 py-2">Código</th>
                            <th className="w-[18%] border-b border-line px-4.5 py-2 text-right">
                                Existencia
                            </th>
                            <th className="w-[33%] border-b border-line px-4.5 py-2 text-right">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td
                                    className="truncate border-b border-line-soft px-4.5 py-2.5 font-mono text-[22px] font-bold"
                                    title={product.name}
                                >
                                    {product.name}
                                </td>
                                <td className="border-b border-line-soft px-4.5 py-2.5 font-mono">
                                    {product.code}
                                </td>
                                <td className="border-b border-line-soft px-4.5 py-2.5 text-right font-mono font-bold">
                                    {formatNumber(product.stock)} pzas
                                </td>
                                <td className="border-b border-line-soft px-4.5 py-2.5">
                                    <div className="flex justify-end gap-2">
                                        <Link
                                            to={`/historial?tornillo=${product.id}`}
                                            className="inline-flex h-11 items-center rounded-sm border border-line px-4 text-sm font-bold"
                                        >
                                            Ver historial
                                        </Link>
                                        <Link
                                            to={`/productos/${product.id}/editar`}
                                            className="inline-flex h-11 items-center rounded-sm border border-line px-4 text-sm font-bold"
                                        >
                                            Editar
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <p className="mt-4 text-[15px] text-ink-soft">
                Un tornillo nuevo empieza con 0 piezas; la existencia solo cambia con entradas y
                salidas. Solo se puede eliminar un tornillo que no tenga movimientos.
            </p>
        </section>
    )
}
