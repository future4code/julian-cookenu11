import express from "express";
import { UserController } from "./controllers/UserController";

const routes: express.Router = express.Router();

routes.post("/signup", UserController.store);
routes.post("/login", UserController.login);

export default routes;
