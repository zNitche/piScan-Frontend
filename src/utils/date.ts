// Should use luxon for this but this one should do the job

export function formatDateToNormal(date: Date) {
    try {
        const datePart = [
            date.getDate(),
            date.getMonth() + 1,
            date.getFullYear(),
        ]
            .map((n, i) => n.toString().padStart(i === 2 ? 4 : 2, "0"))
            .join("/");
        const timePart = [date.getHours(), date.getMinutes(), date.getSeconds()]
            .map((n) => n.toString().padStart(2, "0"))
            .join(":");

        return datePart + " " + timePart;
    } catch {
        return null;
    }
}
