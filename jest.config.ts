import type { Config } from '@jest/types';

const configBase: Config.InitialOptions = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '@application/(.*)': '<rootDir>/src/application/$1',
        '@infrastructure/(.*)': '<rootDir>/src/infrastructure/$1',
        '@presentation/(.*)': '<rootDir>/src/presentation/$1',
    },
    setupFiles: ['./src/IocContainerSetup.ts'],
};

const unitConfig: Config.InitialOptions = {
    ...configBase,
    displayName: 'unit',
    roots: ['tests/unit'],
};

const apiConfig: Config.InitialOptions = {
    ...configBase,
    displayName: 'api',
    roots: ['tests/api'],
};

const e2eConfig: Config.InitialOptions = {
    ...configBase,
    displayName: 'e2e',
    roots: ['tests/e2e'],
    globals: {
        TESTS_DATABASE_NAME: 'e2e',
    },
    setupFilesAfterEnv: ['./tests/config/TestsDatabseConnectionSetup.ts'],
};

const configs = {
    projects: [unitConfig, apiConfig, e2eConfig],
};

export default configs;
