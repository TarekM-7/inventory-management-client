import { OrbitProgress } from "react-loading-indicators"

export default function Loading() {
    return (
        <div className="flex w-full flex-col items-center p-8">
            <p className="text-lg text-ink-soft">Cargando...</p>
            <OrbitProgress color="#f0282c" size="medium" text="" textColor="" />
        </div>
    )
}
