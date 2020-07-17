import { BaseDatabase } from './BaseDatabase';

export class UserFollowers extends BaseDatabase {
    public async follow(user_id: string, follower_id: string): Promise<void> {
        await this.getConnection()
            .insert({
                user_id,
                follower_id
            })
            .into("UserFollowersCookenu");
    }

    public async unfollow(user_id: string, follower_id: string): Promise<void> {
        await this.getConnection()
            .delete()
            .from("UserFollowersCookenu")
            .where({
                user_id,
                follower_id
            });
    }
}