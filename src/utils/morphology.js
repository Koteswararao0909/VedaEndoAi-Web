export const getMorphology = (thickness) => {
    const t = parseFloat(thickness);
    if (isNaN(t)) return "--";
    if (t < 5) return "Atrophic";
    if (t < 7) return "Thin";
    if (t <= 14) return "Trilaminar";
    return "Hyperplastic"; // Often used for > 14mm in clinical contexts
};
