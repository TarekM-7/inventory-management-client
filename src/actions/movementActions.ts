import type { ActionFunctionArgs } from "react-router"
import { MovementInputSchema } from "../types"
import { flatten, safeParse } from "valibot"
import { createMovement } from "../services/MovementService"
import { formatNumber } from "../utils"

export async function registerMovementAction({ request }: ActionFunctionArgs) {
    const formData = Object.fromEntries(await request.formData())
    const result = safeParse(MovementInputSchema, formData)
    if (!result.success) {
        return { errors: flatten(result.issues).nested }
    }

    await createMovement(result.output)

    const { type, quantity } = result.output
    const label = type === "out" ? "Salida" : "Entrada"
    return { ok: `${label} registrada: ${formatNumber(quantity)} pzas.`, savedAt: Date.now() }
}
