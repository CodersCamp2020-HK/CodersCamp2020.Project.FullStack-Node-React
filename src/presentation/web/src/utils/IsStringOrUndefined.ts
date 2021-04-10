export default function isStringOrUndefined<T>(value: string | undefined | T): value is string | undefined {
    return typeof value === "string" || typeof value === 'undefined'
}