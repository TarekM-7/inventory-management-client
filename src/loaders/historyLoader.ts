import type { LoaderFunctionArgs } from "react-router"
import { getMovements } from "../services/MovementService"

export async function historyLoader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get("pagina")) || 1

    const movements = await getMovements(page)
    return { movements }
}
