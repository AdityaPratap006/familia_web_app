export const getLocalDateText = (dateString: string) => {
    const localDate = new Date(dateString).toLocaleString("en-IN", {
        hour12: true,
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        weekday: "short",
    });
    return localDate;
}