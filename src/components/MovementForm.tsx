import { Form, useActionData, useNavigation } from "react-router"
import type { registerMovementAction } from "../actions/movementActions"
import type { Product } from "../types"
import { useState } from "react"
import { formatNumber } from "../utils"

type MovementFormProps = {
    product: Product
}

type MovementErrors = {
    quantity?: string[]
    note?: string[]
}

export default function MovementForm({ product }: MovementFormProps) {
    const actionData = useActionData<typeof registerMovementAction>()
    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting"
    const [type, setType] = useState<"in" | "out">("out")

    const errors: MovementErrors | undefined =
        actionData && "errors" in actionData ? actionData.errors : undefined
    const ok = actionData && "ok" in actionData ? actionData.ok : undefined
    const savedAt = actionData && "savedAt" in actionData ? actionData.savedAt : 0

    return (
        <Form key={savedAt} method="post" className="flex flex-col gap-5">
            <div className="border-b border-line-soft pb-4">
                <p className="font-mono text-4xl font-bold">{product.name}</p>
                <p className="mt-1 text-lg text-ink-soft">
                    Código {product.code} · {formatNumber(product.stock)} pzas en existencia
                </p>
            </div>

            <input type="hidden" name="productId" value={product.id} />
            <input type="hidden" name="type" value={type} />

            <fieldset className="flex flex-col gap-2">
                <legend className="mb-2 text-lg font-bold">Tipo de movimiento</legend>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        aria-pressed={type === "out"}
                        onClick={() => setType("out")}
                        className={`h-18 cursor-pointer rounded-sm border-2 text-2xl ${
                            type === "out"
                                ? "border-out bg-out font-bold text-white"
                                : "border-line bg-white text-ink-soft"
                        }`}
                    >
                        ↗ Salida
                    </button>
                    <button
                        type="button"
                        aria-pressed={type === "in"}
                        onClick={() => setType("in")}
                        className={`h-18 cursor-pointer rounded-sm border-2 text-2xl ${
                            type === "in"
                                ? "border-in bg-in font-bold text-white"
                                : "border-line bg-white text-ink-soft"
                        }`}
                    >
                        ↙ Entrada
                    </button>
                </div>
            </fieldset>

            <div className="flex flex-col gap-2">
                <label htmlFor="quantity" className="text-lg font-bold">
                    Cantidad (piezas)
                </label>
                <input
                    id="quantity"
                    name="quantity"
                    inputMode="numeric"
                    autoComplete="off"
                    autoFocus
                    placeholder="0"
                    className="h-22 rounded-sm border-2 border-line px-5 font-mono text-5xl font-bold"
                />
                {errors?.quantity && (
                    <p className="font-bold text-warning-text">{errors.quantity[0]}</p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="note" className="text-lg font-bold">
                    Nota <span className="font-normal text-ink-soft">(opcional)</span>
                </label>
                <input
                    id="note"
                    name="note"
                    autoComplete="off"
                    placeholder="Ej. Línea 2"
                    className="h-14 rounded-sm border-2 border-line px-4 text-xl"
                />
                {errors?.note && <p className="font-bold text-warning-text">{errors.note[0]}</p>}
            </div>

            {ok && (
                <p role="status" className="rounded-sm border-2 border-in bg-in/10 p-4 text-center text-[19px] font-bold text-in-text">
                    {ok}
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className={`h-21 cursor-pointer rounded-sm text-[26px] font-bold text-white disabled:opacity-60 ${
                    type === "out" ? "bg-out" : "bg-in"
                }`}
            >
                {isSubmitting
                    ? "Registrando..."
                    : type === "out"
                      ? "Registrar salida"
                      : "Registrar entrada"}
            </button>
            <p className="-mt-1.5 text-center text-ink-soft">
                También puedes presionar{" "}
                <kbd className="rounded-sm border border-line bg-cell px-1.5 font-mono text-ink">
                    Enter
                </kbd>{" "}
                en la cantidad.
            </p>
        </Form>
    )
}
