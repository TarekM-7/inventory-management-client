import { parse } from "valibot"
import { api } from "./api"
import { MovementsResponseSchema } from "../types"

export async function getLatestMovements() {
    const { data } = await api.get("/api/movements", { params: { limit: 8 } })
    return parse(MovementsResponseSchema, data).data
}
