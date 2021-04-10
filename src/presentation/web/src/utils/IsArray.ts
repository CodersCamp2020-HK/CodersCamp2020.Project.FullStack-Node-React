export default function isArray<T>(value: T | string[]): value is Array<string> {
    return Array.isArray(value);
}
