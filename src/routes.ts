import { RecipeController } from "./controllers/RecipeController";
import express from "express";
import { UserController } from "./controllers/UserController";

const routes: express.Router = express.Router();

routes.post("/signup", UserController.store);
routes.post("/login", UserController.login);
routes.post("/recipe", RecipeController.store);
routes.get("/recipe/:id", RecipeController.show);

export default routes;
