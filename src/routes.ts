import express from "express";
import { createUser, login } from "./controllers/UserController";

const routes: express.Router = express.Router();

routes.post("/signup", createUser.store);
routes.post("/login", login.store);

export default routes;
