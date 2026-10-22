export function formatNumber(value: number) {
    return value.toLocaleString("es-MX")
}

export function formatDateTime(isoDate: string) {
    return new Date(isoDate).toLocaleString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    })
}
