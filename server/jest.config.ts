import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '@application/(.*)': '<rootDir>/src/application/$1',
        '@domain/(.*)': '<rootDir>/src/domain/$1',
        '@infrastructure/(.*)': '<rootDir>/src/infrastructure/$1',
        '@presentation/(.*)': '<rootDir>/src/presentation/$1',
    },
};

export default config;
