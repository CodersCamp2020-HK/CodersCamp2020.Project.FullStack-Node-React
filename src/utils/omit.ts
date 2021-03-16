/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const omit = (prop: string, { [prop]: _, ...rest }): Record<string, any> => rest;
export { omit };
