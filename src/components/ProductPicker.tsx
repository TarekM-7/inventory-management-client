import type { Product } from "../types"
import { formatNumber } from "../utils"

type ProductPickerProps = {
    products: Product[]
    selectedId?: number
    onSelect: (id: number) => void
}

export default function ProductPicker({ products, selectedId, onSelect }: ProductPickerProps) {
    return (
        <div className="border border-line bg-white">
            {products.map((product) => {
                const isSelected = product.id === selectedId

                return (
                    <button
                        key={product.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => onSelect(product.id)}
                        className={`grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-5 border-b border-line-soft px-6 py-4 text-left last:border-b-0 ${
                            isSelected
                                ? "bg-in/10 outline-2 -outline-offset-2 outline-in"
                                : "hover:bg-page"
                        }`}
                    >
                        <span>
                            <span className="block font-mono text-2xl font-bold">
                                {product.name}
                            </span>
                            <span className="text-ink-soft">Código {product.code}</span>
                        </span>
                        <span className="text-right">
                            <span className="block font-mono text-2xl font-bold">
                                {formatNumber(product.stock)}
                            </span>
                            <span className="text-sm text-ink-soft">pzas en existencia</span>
                        </span>
                    </button>
                )
            })}
        </div>
    )
}
