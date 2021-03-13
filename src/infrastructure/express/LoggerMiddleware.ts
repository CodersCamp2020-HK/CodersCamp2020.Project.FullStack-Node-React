import morgan, { StreamOptions } from 'morgan';
const format = ':method :url :status :res[content-length] - :response-time ms' as const;
const useLogging = (stream: StreamOptions) => [morgan(format, { stream })];

export { useLogging };
