import logo from "../assets/logo.svg"

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
                    <img src={logo} alt="Troqueles Demo" className="h-11" />
                </div>
                <div className="flex flex-col justify-center px-7 py-2">
                    <span className="text-[13px] tracking-wide text-ink-soft">
                        TROQUELES DEMO, S.A. DE C.V.
                    </span>
                    <span className="text-[22px] font-bold">
                        Control de inventario de tornillos
                    </span>
                </div>
                <table className="text-sm">
                    <tbody>
                        <tr>
                            <th className="border-l border-line bg-cell px-4 text-left">Área</th>
                            <td className="border-l border-line px-4">Almacén</td>
                        </tr>
                        <tr>
                            <th className="border-t border-l border-line bg-cell px-4 text-left">
                                Fecha
                            </th>
                            <td className="border-t border-l border-line px-4 font-mono">
                                {today}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="h-1.5 bg-brand"></div>
        </header>
    )
}
