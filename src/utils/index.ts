export function formatNumber(value: number) {
    return value.toLocaleString("es-MX")
}

export function formatDateTime(isoDate: string, part: "date" | "time") {
    const date = new Date(isoDate)

    if (part === "date") {
        return date.toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        })
    }

    return date.toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit"
    })
}
