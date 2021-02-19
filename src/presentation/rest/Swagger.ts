import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './generated/swagger.json';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useSwagger = () => [swaggerUi.serve, swaggerUi.setup(swaggerDoc, { explorer: true })];

export { useSwagger };
