import type { Product } from "../types"
import { formatNumber } from "../utils"
import CheckIcon from "./CheckIcon"

type ProductPickerProps = {
    products: Product[]
    selectedId?: number
    onSelect: (id: number) => void
}

export default function ProductPicker({ products, selectedId, onSelect }: ProductPickerProps) {
    return (
        <div className="max-h-124 overflow-y-auto border border-line bg-white">
            {products.map((product) => {
                const isSelected = product.id === selectedId

                return (
                    <button
                        key={product.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => onSelect(product.id)}
                        className={`grid w-full cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-5 border-b border-line-soft px-6 py-5 text-left last:border-b-0 ${
                            isSelected
                                ? "bg-in/10 outline-2 -outline-offset-2 outline-in"
                                : "hover:bg-page"
                        }`}
                    >
                        {isSelected ? (
                            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-in text-white">
                                <CheckIcon />
                            </span>
                        ) : (
                            <span className="size-7 shrink-0 rounded-full border-2 border-line" />
                        )}
                        <span className="min-w-0">
                            <span
                                title={product.name}
                                className="mb-1 block truncate font-mono text-3xl font-bold"
                            >
                                {product.name}
                            </span>
                            <span className="text-ink-soft">Código {product.code}</span>
                        </span>
                        <span className="text-right">
                            <span className="block font-mono text-[32px] font-bold">
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
