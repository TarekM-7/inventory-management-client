import { NavLink } from "react-router"

const tabs = [
    { to: "/", label: "Registrar" },
    { to: "/productos", label: "Productos" },
    { to: "/historial", label: "Historial" }
]

export default function Tabs() {
    return (
        <nav className="flex gap-1 border-b border-line px-8 pt-3.5">
            {tabs.map((tab) => (
                <NavLink
                    key={tab.to}
                    to={tab.to}
                    className={({ isActive }) =>
                        `-mb-px flex h-12 items-center rounded-t border border-line px-7 text-lg ${
                            isActive ? "border-b-white bg-white font-bold" : "bg-line-soft"
                        }`
                    }
                >
                    {tab.label}
                </NavLink>
            ))}
        </nav>
    )
}
