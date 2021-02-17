import { Response as ExResponse, Request as ExRequest } from 'express';
import swaggerUi from 'swagger-ui-express';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useSwagger = () => [
    swaggerUi.serve,
    async (_req: ExRequest, res: ExResponse) => {
        return res.send(swaggerUi.generateHTML(await import('../generated/swagger.json')));
    },
];

export { useSwagger };
