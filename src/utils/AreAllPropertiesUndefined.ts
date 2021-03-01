export const areAllPropertiesUndefined = (obj: Record<string, unknown>): boolean => {
    for (const key in obj) {
        if (obj[key] !== undefined) return false;
    }
    return true;
};
