import type { ActionFunctionArgs } from "react-router"
import { MovementInputSchema } from "../types"
import { flatten, safeParse } from "valibot"
import { createMovement } from "../services/MovementService"
import { formatNumber } from "../utils"
import { isAxiosError } from "axios"

export async function registerMovementAction({ request }: ActionFunctionArgs) {
    const formData = Object.fromEntries(await request.formData())
    const result = safeParse(MovementInputSchema, formData)
    if (!result.success) {
        return { errors: flatten(result.issues).nested }
    }

    try {
        await createMovement(result.output)
    } catch (error) {
        if (isAxiosError(error) && error.response?.status === 409) {
            return { errors: { quantity: ["No hay suficientes piezas en existencia."] } }
        }
        throw error
    }

    const { type, quantity } = result.output
    const label = type === "out" ? "Salida" : "Entrada"
    return { ok: `${label} registrada: ${formatNumber(quantity)} pzas.`, savedAt: Date.now() }
}
