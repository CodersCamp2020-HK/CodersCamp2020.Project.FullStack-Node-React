import pg from 'pg';
import 'dotenv/config';

describe('Given: postgres connection string', () => {
    let client: any;
    beforeAll(() => {
        client = new pg.Client(process.env.DATABASE_URL);
    });
    afterAll(() => {
        client.end();
    });
    describe('When: connectiing to database', () => {
        it('Then: connection is made', async () => {
            client.connect((err: Error) => {
                if (err) throw new Error('Connection to database refused');
            });
        });
    });
});
