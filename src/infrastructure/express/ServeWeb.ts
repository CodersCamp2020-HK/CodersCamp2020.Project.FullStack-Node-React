import express from 'express';

const router = express.Router();

interface ServeWebOptions {
    staticPath: string;
    entryPath: string;
}

const serveWeb = (options: ServeWebOptions) => {
    router.use('*', (_req: any, res: express.Response) => {
        res.sendFile(options.entryPath);
    });
    return [express.static(options.staticPath), router];
};

export { serveWeb };
