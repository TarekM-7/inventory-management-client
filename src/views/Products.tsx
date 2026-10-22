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
                    className="flex h-13 items-center bg-out px-6 text-lg font-bold text-white"
                >
                    + Nuevo Tornillo
                </Link>
            </div>

            {products.length === 0 ? (
                <p className="border border-line bg-white p-6 text-lg">
                    Todavía no hay tornillos registrados.
                </p>
            ) : (
                <table className="w-full border border-line bg-white text-lg">
                    <thead>
                        <tr className="bg-cell text-left text-sm tracking-wide uppercase">
                            <th className="border-b border-line px-5 py-3">Nombre (Odoo)</th>
                            <th className="border-b border-line px-5 py-3">Código</th>
                            <th className="border-b border-line px-5 py-3 text-right">
                                Existencia
                            </th>
                            <th className="border-b border-line px-5 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="border-b border-line-soft px-5 py-3 font-mono text-xl font-bold">
                                    {product.name}
                                </td>
                                <td className="border-b border-line-soft px-5 py-3 font-mono">
                                    {product.code}
                                </td>
                                <td className="border-b border-line-soft px-5 py-3 text-right font-mono font-bold">
                                    {formatNumber(product.stock)} pzas
                                </td>
                                <td className="border-b border-line-soft px-5 py-3">
                                    <div className="flex justify-end gap-2">
                                        <Link
                                            to={`/historial?tornillo=${product.id}`}
                                            className="inline-flex h-11 items-center border border-line px-4 font-bold"
                                        >
                                            Ver historial
                                        </Link>
                                        <Link
                                            to={`/productos/${product.id}/editar`}
                                            className="inline-flex h-11 items-center border border-line px-4 font-bold"
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
        </section>
    )
}
