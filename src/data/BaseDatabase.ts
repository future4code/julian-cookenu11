import Knex from 'knex';
import knex from '../database/config';

export abstract class BaseDatabase {
    private static connection: Knex;

    protected getConnection(): Knex {
        BaseDatabase.connection = knex;

        return BaseDatabase.connection;
    }

    public static async destroyConnection(): Promise<void> {
        if(BaseDatabase.connection) {
            await BaseDatabase.connection.destroy();
        }
    }
}