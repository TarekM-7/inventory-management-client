import { Form, useNavigation, Link } from "react-router"
import type { Product } from "../types"

type ProductFormProps = {
    product?: Product
    errors?: { name?: string[]; code?: string[] }
    submitLabel: string
}

export default function ProductForm({ product, errors, submitLabel }: ProductFormProps) {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting"

    return (
        <Form method="post" className="flex flex-col gap-6 border border-line bg-white p-6">
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-lg font-bold">
                    Nombre (como en Odoo)
                </label>
                <input
                    id="name"
                    name="name"
                    defaultValue={product?.name}
                    placeholder="FT-LW-G6X-0000"
                    autoComplete="off"
                    className="h-14 rounded-sm border-2 border-line px-4 font-mono text-xl"
                />
                {errors?.name && <p className="font-bold text-warning-text">{errors.name[0]}</p>}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="code" className="text-lg font-bold">
                    Código
                </label>
                <input
                    id="code"
                    name="code"
                    defaultValue={product?.code}
                    placeholder="4001800_00000"
                    autoComplete="off"
                    className="h-14 rounded-sm border-2 border-line px-4 font-mono text-xl"
                />
                <p className="text-ink-soft">Debe ser único. Se guarda en mayúsculas.</p>
                {errors?.code && <p className="font-bold text-warning-text">{errors.code[0]}</p>}
            </div>

            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-14 cursor-pointer rounded-sm bg-out px-8 text-lg font-bold text-white disabled:opacity-60"
                >
                    {isSubmitting ? "Guardando..." : submitLabel}
                </button>
                <Link
                    to="/productos"
                    className="flex h-14 items-center rounded-sm border border-line px-8 text-lg font-bold"
                >
                    Cancelar
                </Link>
            </div>
        </Form>
    )
}
