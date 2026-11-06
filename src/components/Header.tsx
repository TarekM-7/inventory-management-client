import logo from "../assets/logo.svg"
import icon from "../assets/icon.svg"

const today = new Date().toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
})

export default function Header() {
    return (
        <header>
            <div className="grid grid-cols-[auto_1fr_auto] border-b border-line bg-white">
                <div className="flex items-center border-r border-line px-7 py-3">
                    <img src={logo} alt="Troqueles Demo" className="hidden h-11 logo:block" />
                    <img src={icon} alt="Troqueles Demo" className="h-11 logo:hidden" />
                </div>
                <div className="flex flex-col justify-center px-7 py-2">
                    <span className="text-xs tracking-[0.06em] text-ink-soft title:text-[13px]">
                        TROQUELES DEMO, S.A. DE C.V.
                    </span>
                    <span className="text-sm font-bold title:text-[22px]">
                        Control de inventario de tornillos
                    </span>
                </div>
                <table className="hidden text-sm info:table">
                    <tbody>
                        <tr>
                            <th className="hidden border-l border-line bg-cell px-4 text-left labels:table-cell">
                                Área
                            </th>
                            <td className="border-l border-line px-4">Almacén</td>
                        </tr>
                        <tr>
                            <th className="hidden border-t border-l border-line bg-cell px-4 text-left labels:table-cell">
                                Fecha
                            </th>
                            <td className="border-t border-l border-line px-4 font-mono">
                                {today}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="h-1.25 bg-brand"></div>
        </header>
    )
}
