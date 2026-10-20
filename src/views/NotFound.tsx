import { Link } from "react-router"

export default function NotFound() {
    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold">Página no encontrada</h1>
            <Link to="/" className="text-in underline">
                Ir a Registrar
            </Link>
        </div>
    )
}
