import { BaseDatabase } from "./BaseDatabase";

export class UserFollowers extends BaseDatabase {
  public async follow(user_id: string, follower_id: string): Promise<void> {
    await this.getConnection()
      .insert({
        user_id,
        follower_id,
      })
      .into("UserFollowersCookenu");
  }

  public async unfollow(user_id: string, follower_id: string): Promise<void> {
    await this.getConnection().delete().from("UserFollowersCookenu").where({
      user_id,
      follower_id,
    });
  }

  public async getRecipeFeed(userId: string): Promise<any> {
    try {
      const feed = await this.getConnection()
        .select("*")
        .from("RecipeCookenu")
        .join(
          "UserFollowersCookenu",
          "RecipeCookenu.user_id",
          "UserFollowersCookenu.user_id"
        )
        .where("UserFollowersCookenu.follower_id", "=", userId )
        .orderBy("RecipeCookenu.created_at", "DESC");
      return feed;
    } catch (error) {
      throw new Error(error.sqlMessage);
    }
  }
}
