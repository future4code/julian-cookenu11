import { Authenticator } from "./../service/Authenticator";
import { Request, Response } from "express";
import { HashManager } from "../service/HashManager";
import { IdGenerator } from "../service/IdGenerator";
import { User } from "../data/User";

const hashManager: HashManager = new HashManager();
const authenticator: Authenticator = new Authenticator();

export const UserController = {
  login: async (request: Request, response: Response): Promise<Response> => {
    const { email, password } = request.body;

    if (!email || email.indexOf("@") === -1) {
      if (!email) {
        return response
          .status(400)
          .json({ error: "E-mail deve ser preenchido." });
      }
      return response.status(400).json({ error: "E-mail inválido." });
    }

    if (!password || password.length < 6) {
      if (!password) {
        return response
          .status(400)
          .json({ error: "Senha deve ser preenchida." });
      }
      return response
        .status(400)
        .json({ error: "Senha deve ter no mínimo 6 caracteres." });
    }

    const userDb: User = new User();

    try {
      const user = await userDb.getUserByEmail(email);
      const passwordCompare = await hashManager.compare(
        password,
        user.password
      );

      if (!passwordCompare) {
        return response.status(400).json({ error: "Senha incorreta." });
      }

      const token = authenticator.generateToken({ id: user.id });

      return response.json({ access_token: token });
    } catch {
      return response.json({ error: "Não encontrado" });
    }
  },

  store: async (request: Request, response: Response): Promise<Response> => {
    const { name, email, password } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Nome incorreto." });
    }

    if (!email || email.indexOf("@") === -1) {
      if (!email) {
        return response
          .status(400)
          .json({ error: "E-mail deve ser preenchido." });
      }
      return response.status(400).json({ error: "E-mail inválido." });
    }

    if (!password || password.length < 6) {
      if (!password) {
        return response
          .status(400)
          .json({ error: "Senha deve ser preenchida." });
      }
      return response
        .status(400)
        .json({ error: "Senha deve ter no mínimo 6 caracteres." });
    }

    const idGenerator: IdGenerator = new IdGenerator();
    const id: string = idGenerator.generate();
    const token: string = authenticator.generateToken({ id });
    const userDb: User = new User();

    try {
      const hashPassword: string = await hashManager.hash(password);

      userDb.createUser(id, name, email, hashPassword);

      return response.json({ access_token: token });
    } catch {
      return response.json({ success: false });
    }
  },
};
