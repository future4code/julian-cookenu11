import { Authenticator } from "./../service/Authenticator";
import { Request, Response } from "express";
import { UserFollowers } from "../data/UserFollowers";
import moment from "moment";

export const FollowersController = {
  store: async (request: Request, response: Response): Promise<Response> => {
    const { user_id } = request.params;
    const token: string = request.headers.authorization as string;
    const authenticator: Authenticator = new Authenticator();

    const userFollowersDb: UserFollowers = new UserFollowers();

    try {
      const authenticationData = authenticator.getData(token);

      await userFollowersDb.follow(user_id, authenticationData.id);

      return response.json({ success: true });
    } catch {
      return response.status(400).json({ success: false });
    }
  },

  destroy: async (request: Request, response: Response): Promise<Response> => {
    const { user_id } = request.params;
    const token: string = request.headers.authorization as string;
    const authenticator: Authenticator = new Authenticator();

    const userFollowersDb: UserFollowers = new UserFollowers();

    try {
      const authenticationData = authenticator.getData(token);

      await userFollowersDb.unfollow(user_id, authenticationData.id);

      return response.json({ success: true });
    } catch {
      return response.status(400).json({ success: false });
    }
  },
  showFeed: async (request: Request, response: Response): Promise<any> => {
    try {
      const token: string = request.headers.authorization as string;
      const authenticator: Authenticator = new Authenticator();
      const userFollowersDb: UserFollowers = new UserFollowers();
      const user = authenticator.getData(token);
      const feed = await userFollowersDb.getRecipeFeed(user.id);

      feed.forEach((recipe: any) => {
        recipe.createdAt = moment(recipe.createdAt).format("DD/MM/YYYY");
      });

      return response.json({ recipes: feed });
    } catch (error) {
      throw new Error(error);
    }
  },
};
