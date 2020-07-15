import { Request, Response } from 'express';
import { HashManager } from '../service/HashManager';
import { IdGenerator } from '../service/IdGenerator';
import { User } from '../data/User';

export const UserController = {
    store: async (request: Request, response: Response): Promise<Response> => {
        const { name, email, password } = request.body;
        const userDb: User = new User();

        if(password.length < 6) {
            return response.status(400).json({ error: "Senha deve ter no mínimo 6 caracteres" });
        }

        const idGenerator: IdGenerator = new IdGenerator();
        const hashManager: HashManager = new HashManager();
        const id: string = idGenerator.generate();

        try {
            const hashPassword: string = await hashManager.hash(password);

            userDb.createUser(id, name, email, hashPassword);

            return response.json({ success: true });
        } catch {
            return response.json({ success: false });
        }

    }
}