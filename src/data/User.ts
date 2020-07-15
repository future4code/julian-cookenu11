import { BaseDatabase } from "./BaseDatabase";

export class User extends BaseDatabase {
  public async createUser(
    id: string,
    name: string,
    email: string,
    password: string
  ): Promise<any> {
    await this.getConnection()
      .insert({
        id,
        name,
        email,
        password,
      })
      .into("UserCookenu");
  }

  public async getUserByEmail(email: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from("UserCookenu")
      .where({ email });
    return result[0];
  }
}
