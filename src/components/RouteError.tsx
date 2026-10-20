import { isAxiosError } from "axios"
import { useRouteError } from "react-router"

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
            className="border-2 border-warning bg-warning-bg p-5 text-lg font-bold text-warning-text"
        >
            {getErrorMessage(error)}
        </div>
    )
}
