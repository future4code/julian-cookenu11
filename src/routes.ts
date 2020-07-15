import express from 'express';

const routes: express.Router = express.Router();

routes.get("/", (request: any, response: any) => {
    return response.json({ message: "Hello world" });
});

export default routes;