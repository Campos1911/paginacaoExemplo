import { FastifyReply, FastifyRequest } from "fastify";
import { userSchema } from "../validators/user.validators";
import { UserServices } from "../services/user.services";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserControllers {
  private userService = new UserServices();

  async registerUser(
    req: FastifyRequest<{ Body: z.infer<typeof userSchema> }>,
    reply: FastifyReply
  ) {
    try {
      const parsed = userSchema.safeParse(req.body);

      if (!parsed.success) {
        return reply.status(400).send({
          message: "Erro de validação",
          errors: parsed.error.flatten().fieldErrors,
        });
      }

      const user = parsed.data;
      const newUser = await this.userService.createUser(user);

      return reply.status(201).send({
        message: "Usuário registrado com sucesso",
        user: newUser,
      });
    } catch (error) {
      return reply.status(500).send({
        message: "Erro interno no servidor",
      });
    }
  }

  async loginUser(
    req: FastifyRequest<{ Body: z.infer<typeof userSchema> }>,
    reply: FastifyReply
  ) {
    try {
      const parsed = userSchema.safeParse(req.body);

      if (!parsed.success) {
        return reply.status(400).send({
          message: "Erro de validação",
          errors: parsed.error.flatten().fieldErrors,
        });
      }

      const { email, senha } = parsed.data;

      // busca usuário
      const userExists = await this.userService.getUserByEmail(email);

      if (!userExists) {
        return reply.status(400).send({
          message: "Usuário não encontrado",
        });
      }

      // valida senha
      const isPasswordValid = await bcrypt.compare(senha, userExists.senha);

      if (!isPasswordValid) {
        return reply.status(401).send({
          message: "Credenciais inválidas",
        });
      }

      // gera token JWT
      const token = jwt.sign(
        { id: userExists.id, email: userExists.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      return reply.status(200).send({
        message: "Login realizado com sucesso",
        user: {
          id: userExists.id,
          email: userExists.email,
        },
        token,
      });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({
        message: "Erro interno no servidor",
      });
    }
  }
}
