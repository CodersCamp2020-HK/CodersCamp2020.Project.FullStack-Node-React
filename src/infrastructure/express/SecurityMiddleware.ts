import cors from 'cors';
import helmet from 'helmet';

interface SecurityOptions {
    isProductionEnv: boolean;
}

const useSecurity = ({ isProductionEnv }: SecurityOptions) => {
    const middlewares = [
        helmet({
            contentSecurityPolicy: {
                directives: {
                    ...helmet.contentSecurityPolicy.getDefaultDirectives(),
                    'script-src': ["'self'", 'maps.googleapis.com'],
                    'img-src': ["'self'", 'data:', 'maps.gstatic.com', '*.googleapis.com', '*.ggpht'],
                    'frame-src': ["'self'", 'https://www.google.com'],
                    'connect-src': ["'self'", 'https://coders-camp-schronisko.herokuapp.com'],
                },
            },
        }),
    ];
    if (!isProductionEnv) {
        middlewares.push(cors({ origin: 'http://localhost:3000' }));
    }
    return middlewares;
};

export { useSecurity };
