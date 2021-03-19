import { getConnection } from 'typeorm';

const DATABASE = global.TESTS_DATABASE_NAME;
const SCHEMA = global.TESTS_DATABASE_SCHEMA_NAME;

it(`[1] Test file should run with db connection to (db:${DATABASE}) (schema:${SCHEMA})`, async () => {
    const connection = getConnection();
    const schema = 'schema' in connection.options ? connection.options.schema : undefined;

    expect(schema).toBe(SCHEMA);
    expect(connection.isConnected).toBeTruthy();

    const [{ current_database }] = await connection.query(`SELECT current_database();`);
    expect(current_database).toBe(DATABASE);
});
