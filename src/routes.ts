import express from 'express';
import { UserController } from './controllers/UserController';

const routes: express.Router = express.Router();

routes.get("/", (request: any, response: any) => {
    return response.json({ message: "Hello world" });
});

routes.post("/users", UserController.store);

export default routes;