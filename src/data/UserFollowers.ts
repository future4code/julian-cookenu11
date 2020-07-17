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
        .select(
          `RecipeCookenu.id as id`,
          `RecipeCookenu.title as title`,
          `RecipeCookenu.description as description`,
          `RecipeCookenu.created_at as createdAt`,
          `RecipeCookenu.user_id as userId`,
          `RecipeCookenu.user_name as userName`
        )
        .from("RecipeCookenu")
        .join(
          "UserFollowersCookenu",
          "RecipeCookenu.user_id",
          "UserFollowersCookenu.follower_id"
        )
        .where("UserFollowersCookenu.user_id", "=", userId)
        .orderBy("RecipeCookenu.created_at", "DESC");
      return feed;
    } catch (error) {
      throw new Error(error.sqlMessage);
    }
  }
}
