import helmet from 'helmet';
import cors from 'cors';

interface SecurityOptions {
    isProductionEnv: boolean;
}

const useSecurity = ({ isProductionEnv }: SecurityOptions) => {
    const middlewares = [helmet()];
    if (!isProductionEnv) {
        middlewares.push(cors({ origin: 'http://localhost:3000' }));
    }
    return middlewares;
};

export { useSecurity };
