import { BaseDatabase } from "./BaseDatabase";

export class Recipe extends BaseDatabase {
  public async createRecipe(
    id: string,
    userId: string,
    description: string,
    title: string,
    userName: string
  ): Promise<any> {
    try {
      await this.getConnection().raw(`
        INSERT INTO RecipeCookenu (id, user_id, description, created_at, title, user_name)
        VALUES ('${id}', '${userId}', '${description}', CURDATE(), '${title}', 
        '${userName}')
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

  public async editRecipe(
    id: string,
    title: string,
    description: string
  ): Promise<any> {
    try {
      await this.getConnection()
        .update({ title, description })
        .from("RecipeCookenu")
        .where("id", "=", id);
    } catch (error) {
      throw new Error(error.sqlMessage);
    }
  }

  public async deleteRecipe(id: string): Promise<any> {
    try {
      await this.getConnection()
        .delete()
        .from("RecipeCookenu")
        .where("id", "=", id);
    } catch (error) {
      throw new Error(error.sqlMessage);
    }
  }
}
