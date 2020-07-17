import { BaseDatabase } from "./BaseDatabase";

export class Recipe extends BaseDatabase {
  public async createRecipe(
    id: string,
    userId: string,
    description: string,
    title: string
  ): Promise<any> {
    try {
      await this.getConnection().raw(`
        INSERT INTO RecipeCookenu (id, user_id, description, created_at, title)
        VALUES ('${id}', '${userId}', '${description}', CURDATE(), '${title}')
    `);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getRecipe(recipeId: string): Promise<any> {
    try {
      const recipe = await this.getConnection()
        .select("*")
        .from("RecipeCookenu")
        .where("id", "=", recipeId);
      return recipe[0];
    } catch (error) {
      throw new Error(error.sqlMessage);
    }
  }

  public async getRecipeFeed(): Promise<any> {
    try {
      const feed = await this.getConnection().select("*").from("RecipeCookenu");
    } catch (error) {}
  }
}
