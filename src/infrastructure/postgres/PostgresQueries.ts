/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Client } from 'pg';
import { parse } from 'pg-connection-string';

interface PostgresConnectionConfig {
    host: string;
    user: string;
    password: string;
    port: number;
    database: string | undefined;
}

interface PostgresUrl {
    url: string;
}

type PostgresConnectionOptions = PostgresConnectionConfig | PostgresUrl;

function isPostgresUrl(value: any): value is PostgresUrl {
    return 'url' in value && typeof value.url === 'string';
}

function parsePostgresUrl({ url }: PostgresUrl): PostgresConnectionConfig {
    const options = parse(url);
    const config = { ...options, port: Number(options.port) };
    const getOrThrowIfNull = <T>(param: keyof typeof config, value: T | null | undefined) => {
        if (value === undefined || value === null) {
            throw new Error(`Invalid postgres url (${param})`);
        }
        return value;
    };
    return {
        host: getOrThrowIfNull('host', config.host),
        user: getOrThrowIfNull('user', config.user),
        password: getOrThrowIfNull('password', config.password),
        port: getOrThrowIfNull('port', config.port),
        database: config.database as string | undefined,
    };
}

async function singleQueryConnection<T>(
    options: PostgresConnectionOptions,
    query: (client: Client) => Promise<T>,
): Promise<T> {
    const config = isPostgresUrl(options) ? parsePostgresUrl(options) : options;
    const client = new Client(config);
    await client.connect();
    try {
        return await query(client);
    } finally {
        await client.end();
    }
}

async function createDatabaseIfNotExists(options: PostgresConnectionOptions, defaultDatabase = 'postgres') {
    const config = isPostgresUrl(options) ? parsePostgresUrl(options) : options;
    const query = async (client: Client) => {
        try {
            const existingDb = await client.query(`
            SELECT datname
            FROM pg_catalog.pg_database
            WHERE lower(datname) = lower('${config.database}');`);
            if (existingDb.rowCount <= 0) {
                return await client.query(`CREATE DATABASE "${config.database}";`);
            }
        } catch (e) {
            console.warn(e);
        }
        return;
    };
    return singleQueryConnection({ ...config, database: defaultDatabase }, query);
}

async function createSchemaIfNotExists(options: PostgresConnectionOptions, schema: string) {
    const query = (client: Client) => client.query(`CREATE SCHEMA IF NOT EXISTS "${schema}";`);
    return singleQueryConnection(options, query);
}

async function dropSchemaIfExists(options: PostgresConnectionOptions, schema: string) {
    const query = (client: Client) => client.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE;`);
    return singleQueryConnection(options, query);
}

export { singleQueryConnection, createDatabaseIfNotExists, createSchemaIfNotExists, dropSchemaIfExists };
