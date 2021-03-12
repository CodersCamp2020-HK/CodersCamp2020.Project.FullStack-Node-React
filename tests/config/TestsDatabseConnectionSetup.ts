import {
    createDatabaseIfNotExists,
    createSchemaIfNotExists,
    dropSchemaIfExists,
} from '@infrastructure/postgres/PostgresQueries';
import path from 'path';
import { Connection, createConnection, ConnectionOptions } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

global.TESTS_DATABASE_SCHEMA_NAME = uuidv4();
const config: ConnectionOptions & { url: string; schema: string } = {
    type: 'postgres',
    url: `postgres://root:root@localhost:5432/${global.TESTS_DATABASE_NAME}`,
    schema: global.TESTS_DATABASE_SCHEMA_NAME,
    entities: [path.resolve(__dirname, '../../src/infrastructure/postgres/*{.ts,.js}')],
    synchronize: true,
    // logging: 'all',
};

const min_1 = 60 * 1000;
jest.setTimeout(min_1 / 2);

let connection: Connection | undefined;

beforeAll(async () => {
    await createDatabaseIfNotExists(config);
    await createSchemaIfNotExists(config, config.schema);
    connection = await createConnection(config);
}, min_1);

afterAll(async () => {
    await connection?.close();
    await dropSchemaIfExists(config, config.schema);
}, min_1);
