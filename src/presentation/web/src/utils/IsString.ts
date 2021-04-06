export default function isString<T>(value: string | T): value is string {
    return typeof value === "string"
}