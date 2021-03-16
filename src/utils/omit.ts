/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const omit = (prop: string, { [prop]: _, ...rest }): Record<string, any> => rest;
export { omit };

interface Omit {
    <T extends Record<string, unknown>, K extends [...(keyof T)[]]>(obj: T, ...keys: K): {
        [K2 in Exclude<keyof T, K[number]>]: T[K2];
    };
}

export const omitMany: Omit = (obj, ...keys) => {
    const ret = {} as {
        [K in keyof typeof obj]: typeof obj[K];
    };
    let key: keyof typeof obj;
    for (key in obj) {
        if (!keys.includes(key)) {
            ret[key] = obj[key];
        }
    }
    return ret;
};
