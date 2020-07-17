import { User } from "./../data/User";
import { IdGenerator } from "./../service/IdGenerator";
import { Authenticator } from "./../service/Authenticator";
import { Recipe } from "./../data/Recipe";
import { Request, Response } from "express";
import moment from "moment";

export const RecipeController = {
  store: async (request: Request, response: Response): Promise<any> => {
    try {
      const { description, title } = request.body;

      if (!title) {
        return response
          .status(400)
          .json({ error: "Título deve ser preenchido." });
      }

      if (!description) {
        return response
          .status(400)
          .json({ error: "Descrição deve ser preenchida." });
      }

      const authenticator: Authenticator = new Authenticator();
      const authenticatorData = authenticator.getData(
        request.headers.authorization as string
      );
      const userId: string = authenticatorData.id;
      const userDb: User = new User();
      const user = await userDb.getById(userId);
      const userName: string = user.name;
      const idGenerator: IdGenerator = new IdGenerator();
      const recipeId: string = idGenerator.generate();
      const recipeDb: Recipe = new Recipe();

      recipeDb.createRecipe(recipeId, userId, description, title, userName);
      return response.json({ sucess: true });
    } catch (error) {
      return response.json({ sucess: false });
    }
  },
  showRecipe: async (request: Request, response: Response): Promise<any> => {
    try {
      const { id } = request.params;
      const token: string = request.headers.authorization as string;
      const authenticator: Authenticator = new Authenticator();
      const recipeDb: Recipe = new Recipe();

      authenticator.getData(token);
      const recipe = await recipeDb.getRecipe(id);

      const date = moment(recipe.createdAt);

      return response.json({
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        createdAt: date.format("DD-MM-YYYY"),
      });
    } catch (error) {
      return response.json({ error: "Receita não encontrada." });
    }
  },
};
