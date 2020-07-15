import { BaseDatabase } from './BaseDatabase';

export class User extends BaseDatabase {
    public async createUser(id: string, name: string, email: string, password: string): Promise<void> {
        await this.getConnection().insert({
            id,
            name,
            email,
            password
        }).into('UserCookenu');
    }
}