import { isAxiosError } from "axios"
import { useRouteError } from "react-router"
import { XCircleIcon } from "@heroicons/react/24/outline"

function getErrorMessage(error: unknown) {
    if (isAxiosError(error)) {
        if (!error.response) {
            return "No se pudo conectar con la API. Revisa que esté encendida."
        }
        return `La API respondió con un error ${error.response.status}.`
    }
    return "Ocurrió un error inesperado."
}

export default function RouteError() {
    const error = useRouteError()
    console.error(error)

    return (
        <div
            role="alert"
            className="flex items-center gap-2 border-2 border-warning bg-warning-bg p-5 text-lg font-bold text-warning-text"
        >
            <XCircleIcon className="size-7 shrink-0" strokeWidth={2} />
            <p>{getErrorMessage(error)}</p>
        </div>
    )
}
