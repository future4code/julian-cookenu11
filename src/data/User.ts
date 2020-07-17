import { BaseDatabase } from "./BaseDatabase";

export class User extends BaseDatabase {
  public async createUser(
    id: string,
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<any> {
    await this.getConnection()
      .insert({
        id,
        name,
        email,
        password,
        role,
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

  public async getById(id: string): Promise<any> {
    const [result] = await this.getConnection()
      .select("*")
      .from("UserCookenu")
      .where({ id });

    return result;
  }
}
