import { RecipeController } from "./controllers/RecipeController";
import express from "express";
import { UserController } from "./controllers/UserController";
import { FollowersController } from "./controllers/FollowersController";

const routes: express.Router = express.Router();

routes.post("/signup", UserController.store);
routes.post("/login", UserController.login);
routes.get("/user/profile", UserController.showProfile);
routes.get("/user/:id", UserController.showUser);
routes.post("/recipe", RecipeController.store);
routes.get("/recipe/:id", RecipeController.showRecipe);
routes.post("/user/:user_id/follow", FollowersController.store);
routes.delete("/user/:user_id/unfollow", FollowersController.destroy);
routes.get("/user/feed", FollowersController.showFeed);

export default routes;
